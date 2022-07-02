// TO DO: CHECK FOR VALIDITY OF INPUT
const express = require('express')
const router = express.Router()
const { Client } = require('pg')

const client = new Client({
  host: 'postgres-db',
  user: 'postgres',
  password: 'passw0rd',
  port: 5432,
  database: 'AREA_DB'
})

client.connect() // CHANGE -> ADD client.end() SOMEHOW!

const getData = async (req, res) => {
  try {
    const query = 'SELECT DISTINCT "Country" FROM "Area"'
    let data = await client.query(query)
    res.send(data.rows)
  } catch (err) {
    res.status(500); // internal server error
    res.send({
      status: "failed",
      message: err.message
    })
  }
}

router.get('/get_countries', getData)
module.exports = router
