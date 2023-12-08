const sqlite3 = require('sqlite3').verbose();
const path = require('path'); 

path1 = path.resolve("database", "beers.db"); 

let db = new sqlite3.Database(path1, (err) => {
  if (err) {
    console.error(err.message);
  }
  else {
  console.log('meszaros2008erno')};
});
let sql = `SELECT * FROM beers WHERE id = 1`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row.name);
  });
});

// close the database connection
db.close();

