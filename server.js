const express = require('express');
const path = require('path');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Adjust this path to your service account key

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

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

// Example route to interact with Firestore
app.get('/api/hyperlinks', async (req, res) => {
    try {
        const hyperlinksSnapshot = await admin.firestore().collection('hyperlinks').get();
        const hyperlinks = hyperlinksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(hyperlinks);
    } catch (error) {
        console.error("Error getting hyperlinks:", error);
        res.status(500).send("Error getting hyperlinks");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
