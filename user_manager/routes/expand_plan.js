const express = require('express');
const router = express.Router();
const { Client } = require('pg')

const client = new Client({
    host: 'postgres-db',
    user: 'postgres',
    password: 'passw0rd',
    port: 5432,
    database: 'USERS_DB'
})

async function expand_plan(req, res) {
    await client.connect(async (err) => {
        if (err) {
            res.status(500)
            res.send({
                status: 'failed',
                details: 'DB connection refused.'
            })
        }
        else {
            let query = {
                text: "UPDATE \"Users\" SET \"DaysLeft\" = \"DaysLeft\" + $1 WHERE \"Email\" = $2",
                values: [req.params["expand_by_days"], req.params["email"]]
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

router.post('/expand_plan/:email/:expand_by_days', expand_plan);
module.exports = router;