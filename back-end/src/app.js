'use strict';

const express = require('express');
const cors = require('cors');

const app = express();

const scoreRouter = require('./routes/score-router');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(scoreRouter);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
