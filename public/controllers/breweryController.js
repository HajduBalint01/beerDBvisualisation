
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
        if (!newBrewery || !newBrewery.name) {
            console.error('Invalid brewery data. Name is required.');
            res.status(400).json({ error: 'Invalid brewery data. Name is required.' });
            return;
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

    updateBrewery(req, res) {
        const id = req.params.id;
        const updatedBrewery = req.body;
        console.log('Received request to update brewery with ID', id, 'to:', updatedBrewery);

        this.model.updateBrewery(id, updatedBrewery, (err, changes) => {
            if (err) {
                console.error('Error updating brewery:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else if (changes === 0) {
                console.log('Brewery not found with ID:', id);
                res.status(404).json({ error: 'Brewery not found' });
            } else {
                console.log('Brewery updated successfully:', { id, ...updatedBrewery });
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

    transformState(country, state) {
        if (country.toLowerCase() === 'united states') {
            const stateToFIPS = {
                'Alabama': '01',
                'Alaska': '02',
                'Arizona': '04',
                'Arkansas': '05',
                'California': '06',
                'Colorado': '08',
                'Connecticut': '09',
                'Delaware': '10',
                'District of Columbia': '11',
                'Florida': '12',
                'Georgia': '13',
                'Hawaii': '15',
                'Idaho': '16',
                'Illinois': '17',
                'Indiana': '18',
                'Iowa': '19',
                'Kansas': '20',
                'Kentucky': '21',
                'Louisiana': '22',
                'Maine': '23',
                'Maryland': '24',
                'Massachusetts': '25',
                'Michigan': '26',
                'Minnesota': '27',
                'Mississippi': '28',
                'Missouri': '29',
                'Montana': '30',
                'Nebraska': '31',
                'Nevada': '32',
                'New Hampshire': '33',
                'New Jersey': '34',
                'New Mexico': '35',
                'New York': '36',
                'North Carolina': '37',
                'North Dakota': '38',
                'Ohio': '39',
                'Oklahoma': '40',
                'Oregon': '41',
                'Pennsylvania': '42',
                'Rhode Island': '44',
                'South Carolina': '45',
                'South Dakota': '46',
                'Tennessee': '47',
                'Texas': '48',
                'Utah': '49',
                'Vermont': '50',
                'Virginia': '51',
                'Washington': '53',
                'West Virginia': '54',
                'Wisconsin': '55',
                'Wyoming': '56',
            };
            return stateToFIPS[state] || state;
        }

        return state;
    }
}

// Replace the existing line:
// module.exports = BreweryController;

// With the following:
if (typeof exports !== 'undefined') {
    exports.BreweryController = BreweryController;
}

