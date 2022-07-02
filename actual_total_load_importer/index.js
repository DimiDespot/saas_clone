const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
db = admin.firestore();

const csvtojson = require("csvtojson");

colParser = {
    "DateTime": function (str) {
        return new Date(str);
    },
    "TotalLoadValue": {
        cellParser: "number"
    }
}

csvtojson({ delimiter: "\t", includeColumns: /DateTime|AreaTypeCode|AreaName|TotalLoadValue/, colParser: colParser })
    .fromFile("2022_01_01_01_ActualTotalLoad6.1.A.csv")
    .subscribe((json) => {
        if (json["AreaTypeCode"] == "CTY") {
            delete json["AreaTypeCode"];
            //console.log(json);
            db.collection("ActualTotalLoad").add(json);
        }
    });