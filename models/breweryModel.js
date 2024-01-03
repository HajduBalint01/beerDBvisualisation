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
        const { name, city, state } = brewery;
        const query = 'INSERT INTO "breweries" (name, city, state) VALUES (?, ?, ?)';
        this.db.run(query, [name, city, state], function (err) {
            callback(err, this.lastID);
        });
    }

    updateBrewery(id, brewery, callback) {
        const { name, city, state } = brewery;
        const query = 'UPDATE "breweries" SET name = ?, city = ?, state = ? WHERE id = ?';
        this.db.run(query, [name, city, state, id], function (err) {
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
