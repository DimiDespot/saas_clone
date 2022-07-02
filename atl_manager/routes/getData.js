// TO DO: CHECK FOR VALIDITY OF INPUT
const express = require('express')
const router = express.Router()
const { Client } = require('pg')
const moment = require('moment')

const client = new Client({
  host: 'postgres-db',
  user: 'postgres',
  password: 'passw0rd',
  port: 5432,
  database: 'ATL_DB'
})
client.connect() // CHANGE -> ADD client.end() SOMEHOW!
const getData = async (req, res) => {
  // Check if request Date is Valid
  if (!moment(req.params['DateFrom'], 'YYYY-MM-DD HH:mm', true).isValid()) {
    res.status(400) // bad request
    res.send({ status: 'failed', message: 'DateFrom format should be: YYYY-MM-DD hh:mm' })
    return
  }
  try {
    const query = {
      text: 'select  atl."DateTime", atl."TotalLoadValue" from "ActualTotalLoad" atl, "Area" a where atl."AreaName" = a."AreaName" and a."Country" = $1 and atl."DateTime" >= $2 order by atl."DateTime"',
      values: [req.params["Country"], req.params["DateFrom"]]
    }
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

router.get('/get_atl/:Country/:DateFrom', getData)
module.exports = router
