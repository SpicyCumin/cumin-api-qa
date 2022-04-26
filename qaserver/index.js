const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();
const { getQuestions, postQuestion, postAnswer, reportQuestion, reportAnswer, helpfulQuestion, helpfulAnswer } = require('../postgresdb/models/models.js');

const PORT = process.env.PORT || 3080;

const app = express();
app.use(express.json());

app.get(`/qa/questions/:productId`, (req, res) => {
  let product_id = req.params.productId;
  getQuestions(product_id)
  .then((data) => res.status(200).send(data))
  .catch((err) => console.log('GET for QA product failed'));
});

app.post(`/qa/questions/`, (req, res) => {
  let questionObj = req.body;
  postQuestion(questionObj)
  .then((data) => res.status(201).send(data))
  .catch((err) => console.log('POST for question failed'));
});

app.post(`/qa/questions/:questionId/answers`, (req, res) => {
  let question_id = req.params.questionId;
  let answerObj = req.body;
  postAnswer(question_id, answerObj)
  .then((data) => res.status(201).send(data))
  .catch((err) => console.log('POST for answer failed'));
});

app.put(`/qa/questions/:questionId/helpful`, (req, res) => {
  let question_id = req.params.questionId;
  helpfulQuestion(question_id)
  .then((data) => res.status(204).send(data))
  .catch((err) => console.log('PUT for question helpful failed'));
});

app.put(`/qa/questions/:questionId/report`, (req, res) => {
  let question_id = req.params.questionId;
  reportQuestion(question_id)
  .then((data) => res.status(204).send(data))
  .catch((err) => console.log('PUT for question reported failed'));
});

app.put(`/qa/answers/:answerId/helpful`, (req, res) => {
  let answer_id = req.params.answerId;
  helpfulAnswer(answer_id)
  .then((data) => res.status(204).send(data))
  .catch((err) => console.log('PUT for answer helpful failed'));
});

app.put(`/qa/answers/:answerId/report`, (req, res) => {
  let answer_id = req.params.answerId;
  reportAnswer(answer_id)
  .then((data) => res.status(204).send(data))
  .catch((err) => console.log('PUT for answer reported failed'));
});

app.listen(PORT, () => {
  console.log(`Listening to port : ${PORT}`);
});
