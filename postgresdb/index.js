const { Client } = require('pg');

const db = new Client({
  host: 'localhost',
  database: 'sdc',
  user: 'postgres',
  password: '',
})

db.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

module.exports = { db };