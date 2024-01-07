const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 

const breweryRoutes = require('./routes/breweryRoutes');

const app = express();
const port = 3000;

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use breweryRoutes for handling brewery-related routes
app.use(breweryRoutes);

// Route for serving index.html on the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
