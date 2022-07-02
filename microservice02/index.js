import { Kafka } from "kafkajs"
//import * as env from "env-var"

const kafka = new Kafka({
   clientId: "consumer",
   brokers: ["kafka-broker:9092"] // [env.get("KAFKA_BOOTSTRAP_SERVER").required().asString()],
})

const topic = "test"
const consumer = kafka.consumer( {groupId: "my-consumer-group"})

const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

errorTypes.map(type => {
  process.on(type, async e => {
    try {
      console.log(`process.on ${type}`)
      console.error(e)
      await consumer.disconnect()
      process.exit(0)
    } catch (_) {
      process.exit(1)
    }
  })
})

signalTraps.map(type => {
  process.once(type, async () => {
    try {
      await consumer.disconnect()
    } finally {
      process.kill(process.pid, type)
    }
  })
})

const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: topic })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const json = message.value
            console.log(json)
        }
    })
}

run().catch(e => console.error(`[kafka-consumer] ${e.message}`, e))
