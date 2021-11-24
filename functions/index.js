require("dotenv").config();
const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());8
app.use(express.static(path.join(__dirname, "..", "client", "build")));

require('./routes/problems.js')(app);

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

exports.calctrainer = functions.https.onRequest(app)