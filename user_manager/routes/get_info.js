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

async function get_info(req, res) {
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
                text: "SELECT * FROM \"Users\" WHERE \"Email\" = $1",
                values: [req.params["email"]]
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

router.get('/create_user/:email', get_info);
module.exports = router;