const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.json());  // NEW: Use JSON body parsing middleware

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

app.get('/brand-with-most-models', (req, res) => {
  fs.readFile('data/car-list.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
    } else {
      const cars = JSON.parse(data);
      let brandsWithMostModels = [];
      let maxModels = 0;
      for (const car of cars) {
        const numberOfModels = car.models.length;
        if (numberOfModels > maxModels) {
          maxModels = numberOfModels;
          brandsWithMostModels = [car.brand];
        } else if (numberOfModels === maxModels) {
          brandsWithMostModels.push(car.brand);
        }
      }
      res.json(brandsWithMostModels);
    }
  });
});

app.get('/brand-with-least-models', (req, res) => {
  fs.readFile('data/car-list.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
    } else {
      const cars = JSON.parse(data);
      let brandsWithLeastModels = [];
      let minModels = Infinity;
      for (const car of cars) {
        const numberOfModels = car.models.length;
        if (numberOfModels < minModels) {
          minModels = numberOfModels;
          brandsWithLeastModels = [car.brand];
        } else if (numberOfModels === minModels) {
          brandsWithLeastModels.push(car.brand);
        }
      }
      res.json(brandsWithLeastModels);
    }
  });
});

app.get('/top-brands/:number', (req, res) => {
  fs.readFile('data/car-list.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
    } else {
      const cars = JSON.parse(data);
      let brandModelsCounts = cars.map(car => ({ brand: car.brand, count: car.models.length }));
      brandModelsCounts.sort((a, b) => b.count - a.count || a.brand.localeCompare(b.brand));
      const topBrands = brandModelsCounts.slice(0, req.params.number).map(b => `${b.brand} - ${b.count}`);
      res.json(topBrands);
    }
  });
});

app.get('/bottom-brands/:number', (req, res) => {
  fs.readFile('data/car-list.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
    } else {
      const cars = JSON.parse(data);
      let brandModelsCounts = cars.map(car => ({ brand: car.brand, count: car.models.length }));
      brandModelsCounts.sort((a, b) => a.count - b.count || a.brand.localeCompare(b.brand));
      const bottomBrands = brandModelsCounts.slice(0, req.params.number).map(b => `${b.brand} - ${b.count}`);
      res.json(bottomBrands);
    }
  });
});

app.get('/brand/:name', (req, res) => {
  fs.readFile('data/car-list.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
    } else {
      const cars = JSON.parse(data);
      const brand = cars.find(car => car.brand.toLowerCase() === req.params.name.toLowerCase());
      if (!brand) {
        res.json([]);
      } else {
        res.json(brand.models);
      }
    }
  });
});

app.post('/brand', (req, res) => {  // MODIFIED: Now a POST endpoint
  const brandName = req.body.nomeMarca;
  
  fs.readFile('data/car-list.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
    } else {
      const cars = JSON.parse(data);
      const brand = cars.find(car => car.brand.toLowerCase() === brandName.toLowerCase());
      
      if (!brand) {
        res.json([]);
      } else {
        res.json(brand.models);
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});