// breweryRoutes.js
const express = require('express');
const path = require('path');
const BreweryController = require('../controllers/breweryController');
const BreweryModel = require('../models/breweryModel');
const authMiddleware = require('../middleware/Middleware'); // Include auth middleware

const router = express.Router();

const dbPath = './database/breweries.db';
const model = new BreweryModel(dbPath);
const controller = new BreweryController(model);

// CRUD endpoints
router.get('/api/breweries', controller.getAllBreweries.bind(controller));
router.get('/api/breweries/:id', controller.getBreweryById.bind(controller));
router.post('/api/breweries', controller.createBrewery.bind(controller));
router.delete('/api/breweries/:id', controller.deleteBreweryById.bind(controller));

router.get('/delete', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'delete.html'));
});

// Additional endpoint for getting US breweries
router.get('/api/us', controller.getUSBreweries.bind(controller));

// Handle form submission from data.html
router.post('/data', authMiddleware, (req, res) => { // Protect the data endpoint
    const newBrewery = req.body;

    // Validate the incoming data (you can add more validation as needed)
    if (!newBrewery || !newBrewery.name || !newBrewery.city || !newBrewery.state_province) {
        return res.status(400).json({ error: 'Invalid brewery data. Name, city, and state_province are required.' });
    }

    // Call the createBrewery method in your controller to insert the data into the database
    controller.createBrewery(req, res);
});

// Serve data.html from the public folder
router.get('/data', authMiddleware, (req, res) => { // Protect the data endpoint
    res.sendFile(path.join(__dirname, '../public', 'data.html'));
});

// Serve index.html from the public folder
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Add a login endpoint
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the provided credentials are correct (replace this with your actual logic)
    const isValidCredentials = (username === 'admin' && password === 'admin');

    if (isValidCredentials) {
        // Set the authenticated status in the session
        req.session.authenticated = true;
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;
