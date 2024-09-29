import { insertHyperlink, updateHyperlink, getHyperlink } from './firestore.js'


const urlParams = new URLSearchParams(window.location.search);
const hyperlinkId = urlParams.get('hyperlink_id');
const position = urlParams.get('position');


document.addEventListener('DOMContentLoaded', async () => {


    if (!hyperlinkId) {
        document.querySelector('#page-title').textContent='Create Button Configuration'
        document.querySelector('title').textContent='Create Button Configuration'
        return;
    }
    const hyperlink = await getHyperlink(hyperlinkId);

    document.getElementById('title').value = hyperlink.title;
    document.getElementById('url').value = hyperlink.url;
    document.getElementById('color').value = hyperlink.color;

});

document.getElementById('edit-form').addEventListener('submit', async (event) => {
    event.preventDefault();


    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const color = document.getElementById('color').value;

    const config = {
        title: title,
        url: url,
        color: color,
        deleted_on:null,
        position:position
    };
    
    if (hyperlinkId) {
        //Update
        await updateHyperlink(hyperlinkId, config)
    } else {
        await insertHyperlink(config)

    }
    // Redirect back to the main page
    window.location.href = 'index.html';
});

