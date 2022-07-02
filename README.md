# NTUA ECE SAAS 2022 PROJECT
  
## TEAM (XX)
  
  
περιγραφή - οδηγίες
  
- Για να στήσετε το docker με τα service-1 και service-2 που έχω φτιάξει τρέχετε:
```sh
docker-compose up -d
```
- Εγώ το docker-compose το κατέβασα ξεχωριστά από το docker.

- Για να χρησιμοποιήσετε ένα shell στον container της επιλογής σας, τρέχετε:
```sh
docker exec -it container_name bash
```
- Για να φτιάξετε καινούριο topic στον kafka server, συνδέεστε στο shell του server
και τρέχετε:
```sh
/kafka/bin/kafka-topics.sh --create --topic topic-name --bootstrap-server kafka-broker:9092
```
ενώ για να δείτε αυτά που ήδη υπάρχουν τρέχετε:
/kafka/bin/kafka-topics.sh --list --bootstrap-server kafka-broker:9092
- Για να στήσετε ένα καινούριο microservice με όνομα service-name βασισμένο σε node
σε container με όνομα container-name (αν έχετε μόνο ένα service βάλτε καλύτερα 
service-name = container-name) και αρχεία κώδικα τα οποία βρίσκονται στο σχετικό path 
από το αρχείο yaml: relpath, προσθέτετε στο τέλος του αρχείου yaml τις γραμμές:
service-name:
    container_name: container-name
    image: node
    working_dir: /app
    volumes:
      - ./relpath:/app
    stdin_open: true
    tty: true
Σημείωση: Τα tty: true και stdin\_open δε ξέρω ακριβώς τι κάνουν, τα είδα να τα βάζουν σε κάποιο
tutorial. Το tty πρέπει να είναι για να μπορείς να συνδέεσαι με ssh. Αν το μάθετε πείτε μου :).
- Μπορείτε να δείτε τη δομή των consumer-producer στα test services: service-1, service-2.
- Άλλες εντολές του docker που μπορεί να σας φανούν χρήσιμες:
```sh
docker ps // Εμφάνιση containers που τρέχουν. Για να δείτε και τους σταματημένους το τρέχετε με -a.
docker stop container-name // μαντέψτε... Αντίστοιχα για start.
docker container prune // διαγραφή από το docker όλων των σταματημένων containers.
docker logs container-name // βλέπετε τα logs του container για debugging σε περίπτωση που πέφτει
```
