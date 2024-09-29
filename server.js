const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;  // Dynamically assign port

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle any other requests
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
