const { Kafka } = require("kafkajs")
const csvtojson = require("csvtojson")
const axios = require("axios")
const express = require("express")
const cors = require("cors")
const cron = require("node-cron")
const moment = require("moment")

const kafka = new Kafka({
    clientId: "atl-producer",
    brokers: ["kafka-broker:9092"]
})

const baseUrl = "https://firebasestorage.googleapis.com/v0/b/saas2022.appspot.com/o"
const producer = kafka.producer()

const parseData = async (yyyy, mm, dd, hh) => {
    let data = []
    let url = baseUrl + `/ATL%2F${yyyy}_${mm}_${dd}_${hh}_ActualTotalLoad6.1.A.csv?alt=media`
    let response = await axios.get(url, { responseType: "stream" })
    let json = await csvtojson({ delimiter: "\t", includeColumns: /DateTime|AreaTypeCode|AreaName|TotalLoadValue/ })
        .fromStream(response.data)
    for (let element of json) {
        if (element["AreaTypeCode"] === "CTY") {
            delete element["AreaTypeCode"]
            data.push(element)
        }
    }
    return data
}

const send = async (data) => {
    await producer.connect()
    await producer.send({
        topic: "ATL_TOPIC",
        messages: [
            { value: JSON.stringify(data) }
        ]
    })
}

const sendData = async (req, res) => {
    let yyyy = req.params["yyyymmddhh"].substr(0, 4)
    let mm = req.params["yyyymmddhh"].substr(4, 2)
    let dd = req.params["yyyymmddhh"].substr(6, 2)
    let hh = req.params["yyyymmddhh"].substr(8, 2)
    try {
        data = await parseData(yyyy, mm, dd, hh)
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
    let date = moment("2022010101", "YYYYMMDDHH")
    cron.schedule("0 * * * * *", async () => {
        const yyyy = date.format("YYYY")
        const mm = date.format("MM")
        const dd = date.format("DD")
        const hh = date.format("HH")
        try {
            const data = await parseData(yyyy, mm, dd, hh)
            await send(data)
        }
        catch (err) {
            console.log(err.message)
        }
        finally {
            date.add(1, "h")
            console.log(date)
        }
    }, {
        scheduled: true
    });
}

run()

// REST API server initialization
let app = express()
app.use(cors())
app.post("/import_atl/:yyyymmddhh", sendData)
app.listen(9201)
