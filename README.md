# System Design: Questions and Answers API 

The goal of this project was to design a RESTful API and database to replace an exisiting API for a question and answer section of an e-commerce application <a href="https://github.com/caminitodelrey/e-commerce-site" > Caminito Del Rey </a> and scale in order to handle traffic loads. 

## Technologies
![Node](https://img.shields.io/badge/-Node-9ACD32?logo=node.js&logoColor=white&style=for-the-badge)
![Express](https://img.shields.io/badge/-Express-DCDCDC?logo=express&logoColor=black&style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=for-the-badge)
![AWS](https://img.shields.io/badge/-AWS-232F3E?logo=amazonaws&logoColor=white&style=for-the-badge)
![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white&style=for-the-badge)
![AutoCannon](https://img.shields.io/badge/-AutoCannon-696969?logo=autocannon&logoColor=white&style=for-the-badge)
![loader.io](https://img.shields.io/badge/-loader.io-6495ED?logo=loader.io&logoColor=white&style=for-the-badge)

## Stress Testing
Stress tested with Loader.io was able to scale to achieve 1000 RPS with a latency of 2ms and 0% error rate. 

## Routes
| Request Type | Endpoint                          | Returns                                                                                                               | Status |
| ------------ | --------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------ |
| GET          | /qa/:productId                    | An object containing questions related to a particular product along with answers/photos associated with the question | 200    |
| POST         | /qa/:productId                    | Nothing is returned but serves a route to post questions about specific product                                       | 201    |
| POST         | /qa/:questionId/answers           | Nothing is returned but this route serves handling posting answers about a specfic question                           | 201    |
| PUT          | /qa/question/:question_id/helpful | A counter associated with the question is incremented up                                                              | 204    |
| PUT          | /qa/question/:question_id/report  | The question will not get deleted but it will no longer be returned upon making a GET request for the questions route | 204    |
| PUT          | /qa/answer/:answer_id/helpful     | A counter associated with the question is incremented up                                                              | 204    |
| PUT          | /qa/answer/:answer_id/report      | The specific response will no longer be returned  upon making a GET request to the answers route                      | 204    |

## Usage 
In the project directory, you can run:
#### `npm run start`
