'use strict';

console.log('hi!');

const { application, request, response } = require('express');
// ***** REQUIRES ******
const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

// *** END POINTS *****

app.get('/', (request, response) => {
  console.log('Terminal');
  response.status(200).send('Welcome to the server!');
});


app.get('/weather', (request, response, next) => {
  try {
    let city_name = request.query.city_name.toLowerCase();
    let lat = Math.floor(request.query.lat);
    let lon = Math.floor(request.query.lon);
    let dataToGroom = data.find(weather => weather.city_name.toLowerCase() === city_name && Math.floor(weather.lon) === lon && Math.floor(weather.lat) === lat);

    let arrData = dataToGroom.data.map((element) => {
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
    console.log(this.low);
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


