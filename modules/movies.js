'use strict';
const axios = require('axios');

async function getMovie(request, response, next) {

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
