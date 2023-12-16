
const express = require('express');
const path = require('path');
const breweryRoutes = require('./routes/breweryRoutes');

const app = express();
const port = 3000;

app.use(express.static('./public'));
app.use(breweryRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});