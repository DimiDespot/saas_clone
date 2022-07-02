const { Kafka } = require("kafkajs")
const { Client } = require('pg')
const express = require('express')
const cors = require('cors')
const getData = require('./routes/getData.js')

const kafka = new Kafka({
    clientId: "atl-consumer",
    brokers: ["kafka-broker:9092"] // [env.get("KAFKA_BOOTSTRAP_SERVER").required().asString()],
})

// Kafka initialization
const consumer = kafka.consumer({ groupId: "atl-consumer" }) // consumer group?

// postgres client initialization
const client = new Client({
    host: 'postgres-db',
    user: 'postgres',
    password: 'passw0rd',
    port: 5432,
    database: 'ATL_DB'
})

const importData = async (data) => { // CHANGE WITH TRANSACTIONS ?
    for (const element of data) {
        let query = {
            text: 'INSERT INTO "ActualTotalLoad"("DateTime", "AreaName", "TotalLoadValue") VALUES($1, $2, $3)' +
            'ON CONFLICT ("DateTime", "AreaName") DO UPDATE SET "TotalLoadValue" = $3',
            values: [element["DateTime"], element["AreaName"], element["TotalLoadValue"]]
        }
        await client.query(query)
    }
}

const importAreas = async (data) => { // CHANGE WITH TRANSACTIONS ?
    for (const element of data) {
        let query = {
            text: 'INSERT INTO "Area"("AreaName", "Country", "MapCode") VALUES($1, $2, $3)' +
            'ON CONFLICT ("AreaName") DO UPDATE SET "Country" = $2, "MapCode" = $3',
            values: [element["AreaName"], element["Country"], element["MapCode"]]
        }
        await client.query(query)
    }
}

const FetchDataFromImporter = async () => {
    await client.connect()
    await consumer.connect()
    await consumer.subscribe({ topic: "ATL_TOPIC" })
    await consumer.subscribe({ topic: "AREA_TOPIC" })
    await consumer.run({
        eachMessage: async ({ topic, message }) => {
            const data = JSON.parse(message.value)
            if (topic === "ATL_TOPIC") {
                await importData(data)
            }
            if (topic === "AREA_TOPIC") {
                await importAreas(data)
            }
        }
    })
}

FetchDataFromImporter().catch(e => console.error(e.message))

// REST API server initialization
//let baseUrl = '/atlmanager/api'
let app = express()
app.use(cors())
//bind endpoints to app rooter
app.use("", getData)
// API Server starts listening -> CHANGE WITH HTTPS
app.listen(9101)
