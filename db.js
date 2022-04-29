const { Client } = require('pg');
const { PORT, HOST1, USER, PASSWORD, DBPORT, DB } = require('../config/config.js')

const db = new Client({
  database: DB,
  host: HOST1,
  user: USER,
  password: PASSWORD,
  port: DBPORT,
})

db.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

module.exports = { db };