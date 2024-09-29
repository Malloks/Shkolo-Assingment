const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;  // Dynamically assign port

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname)));

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to serve the edit button configuration HTML file
app.get('/editButton.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'editButton.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
