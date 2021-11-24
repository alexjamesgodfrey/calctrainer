require("dotenv").config();
const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser')
const path = require("path");

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(path.join(__dirname, "..", "client", "build")));

require('./routes/users.js')(app);
require('./routes/surveyresponses.js')(app);
require('./routes/flows.js')(app);
require('./routes/notion.js')(app);

app.get("/", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
    } catch (err) {
        console.error(err.message);
    }
})

if (process.env.DEVELOPMENT === 'true') {
    app.listen(5000, () => {
        console.log(`server has started on port ${5000}`);
        console.log('static file served at ' + path.join(__dirname, "..", "client", "build", "index.html"));
    });
}

exports.automatestudy = functions.https.onRequest(app)