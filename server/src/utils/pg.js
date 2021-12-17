const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'postgres',
  password: '12345678',
  port: 5432,
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
})


async function many(q) {
  try {
    let res = await pool.query(q)
    return res;
  } catch (e) {
    return e;
  }
}
module.exports = {
  many
}