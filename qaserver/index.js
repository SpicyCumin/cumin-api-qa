const express = require('express');
const path = require('path');
require('dotenv').config();
const { getQuestions } = require('../postgresdb/models/models.js');

const PORT = process.env.PORT || 3080;

const app = express();
app.use(express.json());

getQuestions();

app.listen(PORT, () => {
  console.log(`Listening to port : ${PORT}`);
});
