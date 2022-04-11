const {animals} = require('./data/animals.json');
const fs = require('fs');
const path = require('path');

const express = require('express');
const { get } = require('express/lib/response');
const { query } = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());

// middleware that instructs the server to make 
// certain files readily available and to not gate it 
// behind a server endpoint, for the index.html link/script calls
app.use(express.static('public'));

// GET Routes for API
app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

// GET Routes for html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.get('/animals', (req, res) => {
  res.sendFile(path.join(__dirname, './public/animals.html'));
});

app.get('/zookeepers', (req, res) => {
  res.sendFile(path.join(__dirname,'./public/zookeepers.html'));
})

app.get('*', (req, res) => { // any route that hasnt been defined will go to homepage
  res.sendFile(path.join(__dirname,'./public/index.html'));
});

// POST Routes
app.post('/api/animals', (req, res) => {
  // req.body is where our incoming content will be
  // console.log(req.body);
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();
  // add the animal to json file and animals array in this function
  // if any data in req.body is incorrect, send 400 error back
  if (!validateAnimal(req.body)){
    res.status(400).send('The animal is not properly formatted.');
  } else {
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});