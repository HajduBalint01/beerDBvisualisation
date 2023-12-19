const BreweryModel = require('../models/breweryModel');

class BreweryController {
    constructor(model) {
        this.model = model;
    }

    getAllBreweries(req, res) {
        this.model.getAllBreweries((err, breweries) => {
            if (err) {
                console.error('Error retrieving data from SQLite:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json(breweries);
            }
        });
    }
    getUSBreweries(req, res) {
        this.model.getUSBreweries((err, breweries) => {
            if (err) {
                console.error('Error retrieving data from SQLite:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json(breweries);
            }
        });
    }

    getBreweryById(req, res) {
        const id = req.params.id;
        this.model.getBreweryById(id, (err, brewery) => {
            if (err) {
                console.error('Error retrieving data from SQLite:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else if (!brewery) {
                res.status(404).json({ error: 'Brewery not found' });
            } else {
                res.json(brewery);
            }
        });
    }

    createBrewery(req, res) {
        const newBrewery = req.body;
        this.model.createBrewery(newBrewery, (err, breweryId) => {
            if (err) {
                console.error('Error creating new brewery:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json({ id: breweryId, ...newBrewery });
            }
        });
    }

    updateBrewery(req, res) {
        const id = req.params.id;
        const updatedBrewery = req.body;
        this.model.updateBrewery(id, updatedBrewery, (err, changes) => {
            if (err) {
                console.error('Error updating brewery:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else if (changes === 0) {
                res.status(404).json({ error: 'Brewery not found' });
            } else {
                res.json({ id, ...updatedBrewery });
            }
        });
    }

    deleteBrewery(req, res) {
        const id = req.params.id;
        this.model.deleteBrewery(id, (err, changes) => {
            if (err) {
                console.error('Error deleting brewery:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else if (changes === 0) {
                res.status(404).json({ error: 'Brewery not found' });
            } else {
                res.json({ message: 'Brewery deleted successfully' });
            }
        });
    }

    
  
}

module.exports = BreweryController;
