const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
db = admin.firestore();

db.collection("Area")
    .where('Country', '==', 'Albania')
    .get()
    .then(snapshot => {
        snapshot.forEach(area => {
            name = area.data()["AreaName"];
            db.collection("ActualTotalLoad")
                .where('AreaName', '==', name)
                .where('DateTime', '>=', new Date("2022-01-01 00:00"))
                .where('DateTime', '<=', new Date("2022-01-01 00:45"))
                .orderBy('DateTime')
                .get()
                .then(snapshot => {
                    snapshot.forEach(atl => {
                        console.log(atl.data());
                    });
                });
        });
    });