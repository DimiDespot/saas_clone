const {Client} = require('pg')

const dbconnect = async () => {
    const client = new Client({
        host: 'postgres-db',
        user: 'admin',
        password: 'passw0rd',
        port: 5432,
        database: 'ATL_DB'
    })
    try {
        console.log("Connecting to PostgreSQL database")
        await client.connect()
        console.log("Connected successfully.")
        console.log("Get all entries in actualtotalloads")
        const res = await client.query('SELECT * FROM actualtotalloads')
        console.log(res.rows)
        await client.end()
    }catch (e) {
        console.log(e)
    }
}
dbconnect()