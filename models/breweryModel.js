const sqlite3 = require('sqlite3');
const path = require('path');

class BreweryModel {
    constructor(dbPath) {
        const absolutePath = path.resolve(dbPath);
        console.log('Absolute Database Path:', absolutePath);
        this.db = new sqlite3.Database(absolutePath, (err) => {
            if (err) {
                console.error('Error opening database:', err.message);
            } else {
                console.log('Connected to the database');
            }
        });
    }

    getAllBreweries(callback) {
        const query = 'SELECT * FROM "breweries"';
        this.db.all(query, callback);
    }

    getBreweryById(id, callback) {
        const query = 'SELECT * FROM "breweries" WHERE id = ?';
        this.db.get(query, [id], callback);
    }

    getUSBreweries(callback) {
        const query = 'SELECT state_province FROM "breweries" WHERE country="United States"';
        this.db.all(query, callback);
    }

    createBrewery(brewery, callback) {
        // Validation - Check if 'brewery' object exists
        if (!brewery) {
            const error = new Error('Invalid brewery data. Brewery object is required.');
            return callback(error, null);
        }
    
        const { name, city, state_province } = brewery;
    
        // Validation - Check if required properties are present
        if (!name || !city || !state_province) {
            const error = new Error('Invalid brewery data. Name, city, and state_province are required.');
            return callback(error, null);
        }
    
        const query = 'INSERT INTO "breweries" (name, city, state_province) VALUES (?, ?, ?)';
        this.db.run(query, [name, city, state_province], function (err) {
            if (err) {
                console.error('Error inserting into "breweries":', err);
            } else {
                console.log('New brewery inserted with ID:', this.lastID);
            }
            callback(err, this.lastID);
        });
    }

    deleteBreweryById(id, callback) {
        const query = 'DELETE FROM "breweries" WHERE id = ?';
        this.db.run(query, [id], callback);
    }


}

module.exports = BreweryModel;


