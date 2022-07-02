import { Kafka } from "kafkajs"
import cron from "node-cron"

const kafka = new Kafka({
    clientId: "producer",
    brokers: ["kafka-broker:9092"]
})

const producer = kafka.producer();

/*
Change expression to '0 0 1 * *' to send every month.
Now it sends every 2 sec
 */
const run = async () => {
    await producer.connect();
    cron.schedule('*/2 * * * * *', async () => {
        let date = new Date();
        let date_key = date.getMonth().toString() + '-' + date.getFullYear().toString();
        await producer.send({
            topic: "timer_test",
            messages: [
                {key: date_key, value: 'OK'}
            ]
        });
    }, {
        scheduled: true,
        timezone: "Europe/Athens"
    });
}

run().catch(e => console.error(`[kafka-producer] ${e.message}`, e))