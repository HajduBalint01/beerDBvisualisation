const express = require('express');
const path = require('path');
const breweryRoutes = require('./routes/breweryRoutes');

const app = express();
const port = 3000;

app.use(express.static('./public'));
app.use(breweryRoutes);

// data add input
app.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'data.html'));
});

// delete input
app.get('/delete', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'delete.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
