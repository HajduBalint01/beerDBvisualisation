const express = require('express');
const BreweryController = require('../controllers/breweryController');
const BreweryModel = require('../models/breweryModel');

const router = express.Router();

const dbPath = '/database/breweries.db';

const model = new BreweryModel(dbPath);

const controller = new BreweryController(model);

router.get('/api/data', controller.getAllBreweries.bind(controller));

module.exports = router;