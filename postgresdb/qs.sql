DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;

DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS  photos CASCADE;

CREATE TABLE questions (
  question_id SERIAL PRIMARY KEY,
  product_id INT,
  question_body TEXT,
  question_date BIGINT,
  asker_name TEXT,
  asker_email TEXT,
  question_reported BOOLEAN,
  question_helpful INT
);

COPY questions (question_id, product_id, question_body, question_date, asker_name, asker_email, question_reported, question_helpful) FROM '/Users/stephanieyeong/RFE2202/cumin-api-qa-csv/questions.csv' DELIMITERS ',' CSV header;

CREATE TABLE answers (
  answer_id SERIAL PRIMARY KEY,
  question_id INT,
  answer_body TEXT,
  answer_date BIGINT,
  answerer_name TEXT,
  answerer_email TEXT,
  answer_reported BOOLEAN,
  answer_helpful INT,
  CONSTRAINT fk_questions
  FOREIGN KEY (question_id)
  REFERENCES questions(question_id)
  ON DELETE CASCADE
);

COPY answers (answer_id, question_id, answer_body, answer_date, answerer_name, answerer_email, answer_reported, answer_helpful) FROM '/Users/stephanieyeong/RFE2202/cumin-api-qa-csv/answers.csv' DELIMITERS ',' CSV header;

CREATE TABLE photos (
  photo_id SERIAL PRIMARY KEY,
  answer_id INT,
  url TEXT,
  CONSTRAINT fk_answers
  FOREIGN KEY (answer_id)
  REFERENCES answers(answer_id)
  ON DELETE CASCADE
);

COPY photos (photo_id, answer_id, url) FROM '/Users/stephanieyeong/RFE2202/cumin-api-qa-csv/answers_photos.csv' DELIMITERS ',' CSV header;

