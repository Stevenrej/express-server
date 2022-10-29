'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const getWeather = require('./modules/weather.js');
const getMovie = require ('./modules/movies.js');
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;


app.get('/', (request, response) => {
  console.log('Terminal');
  response.status(200).send('Welcome to the server!');
});

app.get('/weather', weatherHandler);

app.get('/movie', getMovie);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  getWeather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!');
    });
}




app.get('*', (request, response) => {
  response.status(404).send('This route does not exist!');
});

app.listen(PORT, () => console.log(`Server up on ${process.env.PORT}`));
