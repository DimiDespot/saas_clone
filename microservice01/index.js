import { Kafka } from "kafkajs"
// import * as env from "env-var"

const kafka = new Kafka({
   clientId: "producer",
   brokers: ["kafka-broker:9092"]  // [env.get("KAFKA_BOOTSTRAP_SERVER").required().asString()],
})


const producer = kafka.producer();

const run = async () => {
    await producer.connect()
    var i = 0
    while (true) {
        await producer.send({
            topic: "test",
            messages: [
                { key: i.toString(), value: Math.random().toString() }
            ]
        })
        ++i
    }
}

run().catch(e => console.error(`[kafka-producer] ${e.message}`, e))
