'use strict';


console.log('hi!');

const { application, request, response } = require('express');
// ***** REQUIRES ******

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const getWeather = require ('./modules/weather.js');
const getMovie = require ('./modules/movies.js');

app.use(cors());

const PORT = process.env.PORT || 3002;

// *** END POINTS *****

app.get('/', (request, response) => {
  console.log('Terminal');
  response.status(200).send('Welcome to the server!');
});

app.get('/weather', getWeather);



app.get('/movie', getMovie);






app.get('*', (request, response) => {
  response.status(404).send('This route does not exist!');
});


//  ***** ERROR HANDLER *****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// *** SERVER START *****

app.listen(PORT, () => console.log(`we are up and running on port ${PORT}`));

