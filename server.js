'use strict';


console.log('hi!');

const { application, request, response } = require('express');
// ***** REQUIRES ******

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

// *** END POINTS *****

app.get('/', (request, response) => {
  console.log('Terminal');
  response.status(200).send('Welcome to the server!');
});


app.get('/weather', async (request, response, next) => {
  let lat = request.query.lat;
  let lon = request.query.lon;

  try {
    let apiUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&lat=${lat}&lon=${lon}`;

    let apiData = await axios.get(apiUrl);



    let arrData = apiData.data.data.map((element) => {
      return new Forecast(element);
    });
    response.status(200).send(arrData);
  } catch (error) {
    next(error);
  }
});

class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.valid_date;
    this.low = weatherObj.low_temp;
    this.high = weatherObj.high_temp;
    this.description = weatherObj.weather.description;
  }
}

app.get('/movie', async (request, response, next) => {
  let cityName = request.query.city_name;



  try {
    let apiMovUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}&language=en-US&page=1&include_adult=false`;



    let apiDataM = await axios.get(apiMovUrl);

    console.log(apiDataM.data.results);
    let arrData = apiDataM.data.results.map((element) => {
      return new Movie(element);
    });
    response.status(200).send(arrData);
  } catch (error) {
    next(error);
  }
});

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.averageVote = movieObj.vote_average;
    this.totalVote = movieObj.vote_count;
    this.imageUrl = movieObj.poster_path;
    this.popularity = movieObj.popularity;
    this.realeasedOn = movieObj.release_date;
  }
}





app.get('*', (request, response) => {
  response.status(404).send('This route does not exist!');
});


//  ***** ERROR HANDLER *****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// *** SERVER START *****

app.listen(PORT, () => console.log(`we are up and running on port ${PORT}`));

// **** IF NEEDED ********************************
// let city_name = request.query.city_name.toLowerCase();
// weather.city_name.toLowerCase() === city_name &&
