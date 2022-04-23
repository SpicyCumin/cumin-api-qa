const { Client } = require('pg');

const db = new Client({
  database: 'postgres',
})

db.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

module.exports = { db };