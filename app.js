var request = require("request");
var rp = require("request-promise");
var firebase = require("firebase");
var express = require('express');
var app = express();
app.use(express.json());

var config = {
    apiKey: "AIzaSyDTqNHyKl1E77Q4L1kEEawuHi50IQeI9gc",
    authDomain: "disastersdb.firebaseapp.com",
    databaseURL: "https://disastersdb.firebaseio.com",
    projectId: "disastersdb",
    storageBucket: "disastersdb.appspot.com",
    messagingSenderId: "796265296874"
};

firebase.initializeApp(config);
var db = firebase.firestore();
db.settings({ timestampsInSnapshots: true })
app.closeFirebase = () => {
    firebase.firestore().disableNetwork();
}

/*
{
	"title" : "TEST",
	"message": "test message",
	"position": {
		"latitude": "10",
		"longitude": "10"
	},
	"donation_url": "url.com",
	"image_url": "url.com"
}
*/
app.post('/sos-request', (req, res) => {
    let obj = {
        "title": "SOS MESSAGE",
        "message": "I NEED HELP",
        "position": {
            "latitude": "44",
            "longitude": "26"
        },
        "donation_url": "",
        "image_url": ""
    }
    db.collection('sos-requests').add(obj).catch((err) => {
        res.status(500).send(err);
    });
    res.status(200).send("Success");
});

app.get('/sos-requests', (req, res) => {
    var ref = db.collection('sos-requests');
    var list = [];
    ref.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            list.push(doc.data());
        });
        res.status(200).send(list);
    });
});

app.post('/help-requests', (req, res) => {
    db.collection('help-requests').add(req.body).catch((err) => {
        res.status(500).send(err);
    });
    res.status(200).send(req.body);
});

app.get('/help-requests', (req, res) => {
    var ref = db.collection('help-requests');
    var list = [];
    ref.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            list.push(doc.data());
        });
        res.status(200).send(list);
    });
});

module.exports = app;