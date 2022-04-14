
// const {animals} = require('./data/animals.json');
// const fs = require('fs');
// const path = require('path');

const express = require('express');
// const { get } = require('express/lib/response');
// const { query } = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

const apiRoutes = require('./routes/apiRoutes'); // will directly read the index file for routes
const htmlRoutes = require('./routes/htmlRoutes'); // "

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());
// middleware that instructs the server to make 
// certain files readily available and to not gate it 
// behind a server endpoint, for the index.html link/script calls
app.use(express.static("public"));

// use routes from html and api for urls
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});