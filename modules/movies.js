'use strict';
const axios = require('axios');

let cache = {};

async function getMovie(request, response, next) {



  try {
    let cityName = request.query.city_name;

    //  KEY CREATION

    let key = cityName + 'photo';

    // IF Data exist and is in a valid timefram send data

    if (cache[key] && (Date.now() - cache[key].timestamp < 1000 * 20 * 60)) {
      console.log('cache hit, image present');
      response.status(200).send(cache[key].data);
    } else {
      console.log('cache missed');



      let apiMovUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}&language=en-US&page=1&include_adult=false`;



      let apiDataM = await axios.get(apiMovUrl);


      let arrData = apiDataM.data.results.map((element) => {
        return new Movie(element);

      });
      cache[key] = {
        data: arrData,
        timestamp: Date.now(),
      };
      response.status(200).send(arrData);
    }
  } catch (error) {
    next(error);
  }
}


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

module.exports = getMovie;
