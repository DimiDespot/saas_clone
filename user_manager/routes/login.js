const express = require('express');
const router = express.Router();
const { Client } = require('pg')
const moment = require('moment')

const client = new Client({
    host: 'postgres-db',
    user: 'postgres',
    password: 'passw0rd',
    port: 5432,
    database: 'USERS_DB'
})

async function login(req, res) {
    await client.connect(async (err) => {
        if (err) {
            res.status(500)
            res.send({
                status: 'failed',
                details: 'DB connection refused.'
            })
        }
        else {
            const mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            let query = {
                text: "IF (EXISTS (SELECT 1 FROM \"Users\" WHERE \"Email\" = $1)) UPDATE \"Users\" SET \"LastLogin\" = $4 WHERE \"Email\" = $1 ELSE INSERT INTO \"Users\"(\"Email\", \"FirstName\", \"LastName\", \"LastLogin\", \"DaysLeft\") VALUES($1, $2, $3, $4, $5)",
                values: [req.params["email"], req.params["first_name"], req.params["last_name"], mysqlTimestamp, req.params["days_left"]]
            }
            await client.query(query, (err, result) => {
                if (err) {
                    res.status(500)
                    res.send({
                        status: 'failed',
                        details: 'Query error.'
                    })
                }
                else {
                    res.send({
                        status: 'success',
                        details: result
                    })
                }
            })
        }
    })
}

router.get('/login/:email', login);
module.exports = router;