const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();
const { getQuestions, reportQuestion, reportAnswer, helpfulQuestion, helpfulAnswer } = require('../postgresdb/models/models.js');

const PORT = process.env.PORT || 3080;

const app = express();
app.use(express.json());

app.get(`/qa/questions/:productId`, (req, res) => {
  let product_id = req.params.productId
  getQuestions(product_id)
});

app.put(`/qa/questions/:questionId/helpful`, (req, res) => {
  let question_id = req.params.questionId;
  helpfulQuestion(question_id)
});

app.put(`/qa/questions/:questionId/report`, (req, res) => {
  let question_id = req.params.questionId;
  reportQuestion(question_id)
});

app.put(`/qa/answers/:answerId/helpful`, (req, res) => {
  let answer_id = req.params.answerId;
  helpfulAnswer(answer_id)
});

app.put(`/qa/answers/:answerId/report`, (req, res) => {
  let answer_id = req.params.answerId;
  reportAnswer(answer_id)
});

app.listen(PORT, () => {
  console.log(`Listening to port : ${PORT}`);
});