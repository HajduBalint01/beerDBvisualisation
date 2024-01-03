const express = require('express');
const BreweryController = require('../controllers/breweryController');
const BreweryModel = require('../models/breweryModel');
const router = express.Router();
const dbPath = './database/breweries.db';

const model = new BreweryModel(dbPath);
const controller = new BreweryController(model);

// CRUD endpoints
router.get('/api/breweries', controller.getAllBreweries.bind(controller));
router.get('/api/breweries/:id', controller.getBreweryById.bind(controller));
router.post('/api/breweries', controller.createBrewery.bind(controller));
router.post('/data', controller.createBrewery.bind(controller));
router.put('/api/breweries/:id', controller.updateBrewery.bind(controller));
router.delete('/api/breweries/:id', controller.deleteBrewery.bind(controller));

// Additional endpoint for getting US breweries
router.get('/api/us', controller.getUSBreweries.bind(controller));

module.exports = router;
