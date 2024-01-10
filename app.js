// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const session = require('express-session'); // Add session middleware
const breweryRoutes = require('./routes/breweryRoutes');
const authMiddleware = require('./middleware/Middleware');

const app = express();
const port = 3000;

// Use session middleware
app.use(session({
    secret: 'your-secret-key', // Change this to a secret key for session encryption
    resave: false,
    saveUninitialized: true,
}));

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use authMiddleware for authentication on protected routes
app.use(['/delete', '/data', '/api/breweries'], authMiddleware);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use breweryRoutes for handling brewery-related routes
app.use(breweryRoutes);

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


// Route for serving index.html on the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
