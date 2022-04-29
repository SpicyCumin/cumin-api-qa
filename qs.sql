DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS photos CASCADE;

-- CREATE DATABASE sdc;

-- \c sdc;

CREATE TABLE questions (
  question_id SERIAL PRIMARY KEY,
  product_id INT,
  question_body TEXT,
  question_date BIGINT,
  asker_name TEXT,
  asker_email TEXT,
  question_reported BOOLEAN,
  question_helpfulness INT
);

COPY questions (question_id, product_id, question_body, question_date, asker_name, asker_email, question_reported, question_helpfulness) FROM '/seed/questions.csv' DELIMITERS ',' CSV header;

CREATE TABLE answers (
  answer_id SERIAL PRIMARY KEY,
  question_id INT,
  answer_body TEXT,
  answer_date BIGINT,
  answerer_name TEXT,
  answerer_email TEXT,
  answer_reported BOOLEAN,
  answer_helpfulness INT,
  answer_photos TEXT[],
  CONSTRAINT fk_questions
  FOREIGN KEY (question_id)
  REFERENCES questions(question_id)
  ON DELETE CASCADE
);

COPY answers (answer_id, question_id, answer_body, answer_date, answerer_name, answerer_email, answer_reported, answer_helpfulness) FROM '/seed/answers.csv' DELIMITERS ',' CSV header;

CREATE TABLE photos (
  photo_id SERIAL PRIMARY KEY,
  answer_id INT,
  url TEXT,
  CONSTRAINT fk_answers
  FOREIGN KEY (answer_id)
  REFERENCES answers(answer_id)
  ON DELETE CASCADE
);

COPY photos (photo_id, answer_id, url) FROM '/seed/answers_photos.csv' DELIMITERS ',' CSV header;

CREATE INDEX ON questions(question_id);
CREATE INDEX ON questions(product_id);
CREATE INDEX ON answers(answer_id);
CREATE INDEX ON answers(question_id);
CREATE INDEX ON photos(photo_id);
CREATE INDEX ON photos(answer_id);

UPDATE answers SET answer_photos = ARRAY(
 SELECT photos.url
 FROM photos
 WHERE photos.answer_id = answers.answer_id
);


SELECT pg_catalog.setval(pg_get_serial_sequence('questions', 'question_id'), (SELECT MAX(question_id) FROM questions)+1);

SELECT pg_catalog.setval(pg_get_serial_sequence('answers', 'answer_id'), (SELECT MAX(answer_id) FROM answers)+1);

