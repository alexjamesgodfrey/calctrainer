require("dotenv").config();
const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "build")));

require('./routes/levels.js')(app);
require('./routes/problems.js')(app);

app.get("/", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
    } catch (err) {
        console.error(err.message);
    }
})

if (process.env.DEVELOPMENT === 'true') {
    app.listen(process.env.PORT, () => {
        console.log(`server has started on port ${process.env.PORT}`);
        console.log('static file served at ' + path.join(__dirname, "..", "client", "build", "index.html"));
    });
}

exports.calctrainer = functions.https.onRequest(app)