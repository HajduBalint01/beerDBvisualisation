const sqlite3 = require('sqlite3');
const path = require('path');

class BreweryModel {
    constructor(dbPath) {
        const absolutePath = path.resolve('database', 'breweries.db');
        console.log('Absolute Database Path:', absolutePath);
        this.db = new sqlite3.Database(absolutePath, (err) => {
            if (err) {
                console.error('Error opening database:', err.message);
            } else {
                console.log('Connected to the database');
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

    getAllBreweries(callback) {
        if (typeof callback !== 'function') {
            console.warn('Warning: Callback must be a function');
            return;
        }

        const query = 'SELECT * FROM "breweries"';
        this.db.all(query, (err, breweries) => {
            if (err) {
                callback(err, null);
                return;
            }

            const transformedBreweries = breweries.map(brewery => {
                const { country, state } = brewery;
                const transformedState = this.transformState(country, state);
                return { ...brewery, state: transformedState };
            });

            callback(null, transformedBreweries);
        });
    }

    getBreweryById(id, callback) {
        const query = 'SELECT * FROM "breweries" WHERE id = ?';
        this.db.get(query, [id], callback);
    }

    createBrewery(brewery, callback) {
        const { name, city, country, state } = brewery;
        const transformedState = this.transformState(country, state);
        const query = 'INSERT INTO "breweries" (name, city, country, state) VALUES (?, ?, ?, ?)';
        this.db.run(query, [name, city, country, transformedState], function (err) {
            callback(err, this.lastID);
        });
    }

    updateBrewery(id, brewery, callback) {
        const { name, city, country, state } = brewery;
        const transformedState = this.transformState(country, state);
        const query = 'UPDATE "breweries" SET name = ?, city = ?, country = ?, state = ? WHERE id = ?';
        this.db.run(query, [name, city, country, transformedState, id], function (err) {
            callback(err, this.changes);
        });
    }

    deleteBrewery(id, callback) {
        const query = 'DELETE FROM "breweries" WHERE id = ?';
        this.db.run(query, [id], function (err) {
            callback(err, this.changes);
        });
    }
}

module.exports = BreweryModel;

