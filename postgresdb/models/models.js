const { db } = require('../index.js');



const getQuestions = (product_id) => {
  let getQuestionsObj = {
    product_id: `${product_id}`,
    results: []
  }
  console.log('in models product', product_id);

  let query = `SELECT * FROM questions WHERE product_id = ${product_id}`;

  db
  .query(query)
  .then((res) => {
    console.log('res query', res.rows)
  })
  .catch((err) => {
    console.log('Err in GET getQuestion', err)
  })

};

const getAnswers = (question_id) => {
  let getAnswersObj = {
    question: `${question_id}`,
    results: []
  }

};

const postQuestion = () => {

};

const postAnswer = () => {

};

const reportQuestion = (question_id) => {
  let start = Date.now();
  let query = `UPDATE questions SET question_reported = TRUE WHERE question_id = ${question_id}`;

  db
  .query(query)
  .then((res) => {
    console.log(`Sucessful update reportedQuestion ${[(Date.now() - start).toString()]}ms`)
  })
  .catch((err) => {
    console.log('Err in update reportedQuestion', err)
  })
};

const reportAnswer = (answer_id) => {
  let start = Date.now();
  let query =  `UPDATE answers SET answer_reported = TRUE WHERE answer_id = ${answer_id}`;

  db
    .query(query)
    .then((res) => {
      console.log(`Sucessful update reportedAnswer ${[(Date.now() - start).toString()]}ms`)
    })
    .catch((err) => {
      console.log('Err in update reportedAnswer', err)
    })
};

const helpfulQuestion = (question_id) => {
  let start = Date.now();
  let query = `UPDATE questions SET question_helpful = question_helpful+1 WHERE question_id = ${question_id}`;

  db
    .query(query)
    .then((res) => {
      console.log(`Sucessful update helpfulQuestion ${[(Date.now() - start).toString()]}ms`)
    })
    .catch((err) => {
      console.log('Err in update helpfulQuestion', err)
    })
};

const helpfulAnswer = (answer_id) => {
  let start = Date.now();
  let query = `UPDATE answers SET answer_helpful = answer_helpful+1 WHERE answer_id = ${answer_id}`;

  db
  .query(query)
  .then((res) => {
    console.log(`Sucessful update helpfulAnswer ${[(Date.now() - start).toString()]}ms`)
  })
  .catch((err) => {
    console.log('Err in update helpfulAnswer', err)
  })

};



module.exports = { getQuestions, reportQuestion, reportAnswer, helpfulQuestion, helpfulAnswer };