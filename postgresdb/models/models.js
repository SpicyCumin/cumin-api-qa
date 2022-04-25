const { db } = require('../index.js');


const getQuestions = (product_id) => {
  let getQuestionsObj = {
    product_id: `${product_id}`,
  }

//   .query(`
//   SELECT * FROM questions AS q
//     LEFT JOIN
//     (  SELECT answers.question_id, json_build_object(
//       'id', answers.answer_id,
//       'question', answers.question_id,
//       'body', answers.answer_body,
//       'date', answers.answer_date,
//       'answerer_name', answers.answerer_name,
//       'helpfulness', answers.answer_helpfulness,
//       'photos', answers.answer_photos
//       )
//     AS answers FROM answers) AS a
//     ON q.question_id = a.question_id
//   WHERE q.product_id = ${product_id}
// `)
  db
    .query(`SELECT row_to_json(answers)
    FROM (SELECT * FROM answers WHERE answers.question_id = 2) AS answers`)
    .then((res) => {
      // var arrQuestionID = []
      // res.rows.map((x) => arrQuestionID.push(x.answers.question))
      // console.log('here', arrQuestionID)
      console.log('who me', res.rows)

    })
    .catch((err) => {
      console.log('Err in GET getQuestion', err)
    })

};

const postQuestion = (questionObj) => {
  let { body, name, email, product_id } = questionObj;
  console.log(questionObj)
  let date = Date.now();


  let query = `INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email) VALUES (${product_id}, ${body}, ${date}, ${name}, ${email})`;
  db
    .query(query)
    .then((res) => {
      console.log(`Sucessful update postQuestion ${[(Date.now() - start).toString()]}ms`)
    })
    .catch((err) => {
      console.log('Err in update postQuestion', err)
    })
};

const postAnswer = (question_id, answerObj) => {
  let { body, name, email, photos} = answerObj;
  let date = Date.now();
  console.log('model answer', question_id)

  let query =  `INSERT INTO answers (question_id, answer_body, answer_date, answerer_name, answerer_email, answer_photos) VALUES (${question_id}, ${body}, ${date}, ${name}, ${email}, ${photos})`;
  db
  .query(query)
  .then((res) => {
    console.log(`Sucessful update postAnswer ${[(Date.now() - start).toString()]}ms`)
  })
  .catch((err) => {
    console.log('Err in update postAnswer', err)
  })
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


module.exports = { getQuestions, postQuestion, postAnswer, reportQuestion, reportAnswer, helpfulQuestion, helpfulAnswer };