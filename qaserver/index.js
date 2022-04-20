const express = require('express');
const path = require('path');
require('dotenv').config();
const  { Questions, Answers } = require('../mongodb/index.js');

const PORT = process.env.PORT || 3080;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening to port : ${PORT}`);
});
