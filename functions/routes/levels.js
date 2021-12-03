/**
 * MAIN ROUTES
 */
 const pool = require("../db.js");

 module.exports = function (app) {

    //get all levels
    app.get("/api/levels", async (req, res) => {
        try {
            const query = await pool.query("SELECT * FROM levels");
            res.json(query.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    //get all user levels
    app.get("/api/levels/:uid", async (req, res) => {
        try {
            const { uid } = req.params
            const query = await pool.query("SELECT * FROM levels where userid=$1", 
            [uid]);
            res.json(query.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    //create a level for user
    app.post("/api/levels", async (req, res) => {
        try {
            const { userid, level, problemid } = req.body
            const query = await pool.query("INSERT INTO levels (userid, level, problemid) VALUES ($1, $2, $3)", 
            [userid, level, problemid]);
            res.json(query.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    //update a level for user
    app.put("/api/levels", async (req, res) => {
        try {
            const { userid, level, problemid } = req.body
            const query = await pool.query("UPDATE levels SET userid=$1, level=$2, problemid=$3 WHERE problemid=$3", 
            [userid, level, problemid]);
            res.json(query.rows);
        } catch (err) {
            console.error(err.message);
        }
    })
}