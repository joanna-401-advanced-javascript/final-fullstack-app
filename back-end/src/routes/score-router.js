'use strict';

const express = require('express');
const uuid = require('uuid/v4');
const router = express.Router();

let scores = [
  {_id: '1', name: 'Kali', score: 1000},
  {_id: '2', name: 'Khal Basil', score: 100},
  {_id: '3', name: 'Ginger', score: 100},
  {_id: '4', name: 'Rose', score: 99},
  {_id: '5', name: 'Demi Dog', score: 50},
];

router.get('/scores', (request, response) => {
  response.status(200).json(scores);
});

router.post('/scores', (request, response) => {
  const data = request.body;
  data._id = uuid();
  scores.push(data);

  response.status(200).json(scores);
});

router.delete('/scores/:id', (request, response) => {
  scores = scores.filter(score => score._id !== request.params.id);

  response.status(200).json(scores);
});

router.get('/scores-bigger-than/:value', (request, response) => {
  const value = request.params.value;
  scores = scores.filter(element => element.score > value);
  response.status(200).json(scores);
});

module.exports = router;
