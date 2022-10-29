// 'use strict';
// const axios = require('axios');

// async function getWeather(request, response, next){
//   let lat = request.query.lat;
//   let lon = request.query.lon;

//   try {
//     let apiUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&lat=${lat}&lon=${lon}`;

//     let apiData = await axios.get(apiUrl);



//     let arrData = apiData.data.data.map((element) => {
//       return new Forecast(element);
//     });
//     response.status(200).send(arrData);
//   } catch (error) {
//     next(error);
//   }
// }


// class Forecast {
//   constructor(weatherObj) {
//     this.date = weatherObj.valid_date;
//     this.low = weatherObj.low_temp;
//     this.high = weatherObj.high_temp;
//     this.description = weatherObj.weather.description;
//   }
// }


// module.exports = getWeather;
