import { getAllHyperlinks, updateHyperlink } from './firestore.js'
const BUTTON_MAX_COUNT = 9;

const button_container = document.querySelector('.grid-container');

// Load button configurations from localStorage
async function Bootstrap() {
    /** @type Array */
    const saved = await getAllHyperlinks();
    const buttons = [];

    while (button_container.lastElementChild) {
        button_container.removeChild(button_container.lastElementChild);
    }

    for (let index = 0; index < BUTTON_MAX_COUNT; index++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');



        const gridButton = document.createElement('button');
        gridButton.classList.add('grid-button');


        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');



        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');



        gridItem.appendChild(gridButton);
        gridItem.appendChild(editButton);
        gridItem.appendChild(deleteButton);

        buttons.push(gridItem);

        button_container.appendChild(gridItem);
    }
    const buttons_visited = Array.from({ length: BUTTON_MAX_COUNT }, (_, i) => false)
    saved.forEach((hyperlink) => {
        const parent = buttons[hyperlink.position];

        buttons_visited[hyperlink.position] = true;
        const button = parent.querySelector(`.grid-button`);
        const editButton = parent.querySelector(`.edit-button`);
        const delButton = parent.querySelector(`.delete-button`);

        button.style.backgroundColor = hyperlink.color;
        button.textContent = hyperlink.title;

        button.addEventListener('click', () => {
            window.open(hyperlink.url, '_blank').focus();
        })
        button.style.backgroundImage = 'none';
        editButton.style.display = 'block';
        editButton.addEventListener('click', () => {
            window.location.href = `editButton.html?hyperlink_id=${hyperlink.id}&position=${hyperlink.position}`;
        })
        delButton.addEventListener('click', () => {
            updateHyperlink(hyperlink.id,
                { ...hyperlink, deleted_on: new Date() }
            ).then(Bootstrap
            );
        })



        delButton.style.display = 'block';
    })

    buttons.forEach((parent, ind) => {
        if (buttons_visited[ind]) {
            return;
        }
        const button = parent.querySelector(`.grid-button`);
        const editButton = parent.querySelector(`.edit-button`);
        const delButton = parent.querySelector(`.delete-button`);
        button.style.backgroundImage = 'url("Assets/addImage.png")';
        button.style.backgroundColor = 'transparent';
        button.textContent = "";
        editButton.style.display = 'none';
        delButton.style.display = 'none';


        button.addEventListener('click', () => {
            const position = Array.prototype.indexOf.call(button_container.children, parent);
            window.location.href = `editButton.html?position=${position}`;
        })

    })
}



Bootstrap()