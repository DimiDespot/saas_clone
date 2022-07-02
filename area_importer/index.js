const { Kafka } = require("kafkajs")
const csvtojson = require("csvtojson")
const axios = require("axios")
const express = require("express")
const cors = require("cors")
const cron = require("node-cron")

const kafka = new Kafka({
    clientId: "areas-producer",
    brokers: ["kafka-broker:9092"]
})

const baseUrl = "https://firebasestorage.googleapis.com/v0/b/saas2022.appspot.com/o"
const producer = kafka.producer()

const parseData = async () => {
    let url = baseUrl + "/countries_data.csv?alt=media"
    let response = await axios.get(url, { responseType: "stream" })
    let data = await csvtojson({ delimiter: ";", includeColumns: /AreaName|Country|MapCode/ })
        .fromStream(response.data)
    return data
}

const send = async (data) => {
    await producer.connect()
    await producer.send({
        topic: "AREA_TOPIC",
        messages: [
            { value: JSON.stringify(data) }
        ]
    })
}

const sendData = async (req, res) => {
    try {
        data = await parseData()
        try {
            await send(data)
        }
        catch (err) {
            res.status(500); // internal server error
            res.send({ "status": "failed" })
            return
        }
    }
    catch (err) {
        res.status(400); // bad request
        res.send({ "status": "failed" })
        return
    }
    res.send({ "status": "OK" })
}

const run = async () => {
    cron.schedule("0 * * * * *", async () => {
        try {
            const data = await parseData()
            await send(data)
        }
        catch (err) {
            console.log(err.message)
        }
    }, {
        scheduled: true
    });
}

run()

// REST API server initialization
let app = express()
app.use(cors())
app.post("/import_areas", sendData)
app.listen(9200)
