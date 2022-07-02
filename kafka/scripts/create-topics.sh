#!/bin/bash
/kafka/bin/kafka-topics.sh --create --topic ATL_TOPIC --bootstrap-server kafka-broker:9092
/kafka/bin/kafka-topics.sh --create --topic AGPT_TOPIC --bootstrap-server kafka-broker:9092
/kafka/bin/kafka-topics.sh --create --topic FF_TOPIC --bootstrap-server kafka-broker:9092
/kafka/bin/kafka-topics.sh --create --topic AREA_TOPIC --bootstrap-server kafka-broker:9092
/kafka/bin/kafka-configs.sh --bootstrap-server kafka-broker:9092 --alter --entity-type topics --entity-name ATL_TOPIC --add-config max.message.bytes=20000000
/kafka/bin/kafka-configs.sh --bootstrap-server kafka-broker:9092 --alter --entity-type topics --entity-name AGPT_TOPIC --add-config max.message.bytes=20000000
/kafka/bin/kafka-configs.sh --bootstrap-server kafka-broker:9092 --alter --entity-type topics --entity-name FF_TOPIC --add-config max.message.bytes=20000000
