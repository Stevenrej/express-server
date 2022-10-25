'use strict';

console.log('hi!');

const { application, request, response } = require('express');
// ***** REQUIRES ******
const express = require('express');
require('dotenv').config();
let data = require('./.data/pets.json');

const app = express();

const PORT = process.env.PORT || 3002;

// *** END POINTS *****

app.get('/', (request, response) => {
  console.log('Terminal');
  response.status(200).send('Welcome to the server!');
});

app.get('/hello', (request, response) => {
  console.log(request.query);
  let firstName = request.query.firstName;
  let lastName = request.query.lastName;
  response.status(200).send(`Howdy ${firstName} ${lastName} thanks for joining my server!`);
});

app.get('/pet', (request, response, next) => {
  try {
    let species = request.query.species;
    console.log(species);
    let dataToGroom = data.find(pet => pet.species === species);
    let datasToSend = new Pet(dataToGroom)
    response.status(200).send(datasToSend);
  } catch (error) {
    next(error);
  }
});

// class Pet {
//   constructor(petObj){
//     this.name = petObj.name,
//     this.breed = petObj.breed,
//   });
// }

app.get('*', (request, response) => {
  response.status(404).send('This route does not exist!');
});


//  ***** ERROR HANDLER *****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// *** SERVER START *****

app.listen(PORT, () => console.log(`we are up and running on port ${PORT}`));


