const { Client } = require('pg');
require('dotenv').config();

const db = new Client({
  user: 'postgres',
  host: 'sdc-postgres',
  database: 'sdc',
  password: process.env.PASSWORD,
  port: 5432,
})

db.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

module.exports = { db };