const { db } = require('./db.js');

const getQuestions = (product_id) => {
  let getQuestionsObj = {
    product_id: `${product_id}`,
  };

  let query = `
    SELECT
      questions.question_id AS question_id,
      questions.question_body AS question_body,
      to_timestamp(questions.question_date) AS question_date,
      questions.asker_name AS asker_name,
      questions.question_helpfulness AS question_helpfulness,
      questions.question_reported AS reported,
      (SELECT
        json_object_agg(answers.answer_id,
          json_build_object(
            'id', answers.answer_id,
            'body', answers.answer_body,
            'date', answers.answer_date,
            'answerer_name', answers.answerer_name,
            'helpfulness', answers.answer_helpfulness,
            'photos', answers.answer_photos
          )) FROM answers
          WHERE questions.question_id = answers.question_id
          )AS answers
      FROM questions
      WHERE questions.product_id = $1::INTEGER
    `;

   return db.query(query, [product_id])
    .then((res) => {
      console.log('Sucessful get in getQuestions')
      getQuestionsObj.results = res.rows;
      return getQuestionsObj;

    })
    .catch((err) => {
      console.log('Err in GET getQuestion', err);
    });
};

const postQuestion = (questionObj) => {
  let { body, name, email, product_id } = questionObj;
  let date = Date.now();

  let query = `INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email) VALUES (${product_id}, '${body}', ${date}, '${name}', '${email}')`;

  return db.query(query)
    .then((res) => {
      console.log(`Sucessful insert postQuestion`);
    })
    .catch((err) => {
      console.log('Err in insert postQuestion', err);
    });
};

const postAnswer = (question_id, answerObj) => {
  let { body, name, email, photos } = answerObj;
  let date = Date.now();
  let query = {
    text: `INSERT INTO answers (question_id, answer_body, answer_date, answerer_name, answerer_email, answer_photos) VALUES ($1, $2, $3, $4, $5, $6)`,
    values: [Number(question_id), body, date, name, email, photos],
  };

  return db.query(query)
    .then((res) => {
      console.log(`Sucessful insert postAnswer`);
    })
    .catch((err) => {
      console.log('Err in insert postAnswer', err);
    });
};

const reportQuestion = (question_id) => {
  let query = `UPDATE questions SET question_reported = TRUE WHERE question_id = ${question_id}`;

  return db.query(query)
    .then((res) => {
      console.log(
        `Sucessful update reportedQuestion`
      );
    })
    .catch((err) => {
      console.log('Err in update reportedQuestion', err);
    });
};

const reportAnswer = (answer_id) => {
  let query = `UPDATE answers SET answer_reported = TRUE WHERE answer_id = ${answer_id}`;

  return db.query(query)
    .then((res) => {
      console.log(
        `Sucessful update reportedAnswer`
      );
    })
    .catch((err) => {
      console.log('Err in update reportedAnswer', err);
    });
};

const helpfulQuestion = (question_id) => {
  let query = `UPDATE questions SET question_helpfulness = question_helpfulness+1 WHERE question_id = ${question_id}`;

  return db.query(query)
    .then((res) => {
      console.log(
        `Sucessful update helpfulQuestion`
      );
    })
    .catch((err) => {
      console.log('Err in update helpfulQuestion', err);
    });
};

const helpfulAnswer = (answer_id) => {
  let query = `UPDATE answers SET answer_helpfulness = answer_helpfulness+1 WHERE answer_id = ${answer_id}`;

  return db.query(query)
    .then((res) => {
      console.log(
        `Sucessful update helpfulAnswer`
      );
    })
    .catch((err) => {
      console.log('Err in update helpfulAnswer', err);
    });
};

module.exports = {
  getQuestions,
  postQuestion,
  postAnswer,
  reportQuestion,
  reportAnswer,
  helpfulQuestion,
  helpfulAnswer,
};

