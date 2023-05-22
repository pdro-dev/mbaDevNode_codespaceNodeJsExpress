const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/car-list', (req, res) => {
  fs.readFile('data/car-list.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
    } else {
      const cars = JSON.parse(data);
      res.json(cars);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



