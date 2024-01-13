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

        console.log(newBrewery);

        // Validation - Check if 'newBrewery' has the expected properties
        if (!newBrewery || !newBrewery.name || !newBrewery.city || !newBrewery.state_province) {
            console.error('Invalid brewery data. Name, city, and state are required.');
            return res.status(400).json({ error: 'Invalid brewery data. Name, city, and state are required.' });
        }

        // Call the model's createBrewery method
        this.model.createBrewery(newBrewery, (err, breweryId) => {
            if (err) {
                console.error('Error creating new brewery:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json({ id: breweryId, ...newBrewery });
            }
        });
    }

    deleteBreweryById(req, res) {
        const id = req.params.id;
    
        // Call the model's deleteBreweryById method
        this.model.deleteBreweryById(id, (err) => {
            if (err) {
                console.error('Error deleting brewery from SQLite:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json({ message: 'Brewery deleted successfully' });
            }
        });
    }

    


}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = BreweryController;
}
