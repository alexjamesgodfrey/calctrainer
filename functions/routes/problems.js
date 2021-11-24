/**
 * MAIN ROUTES
 */
 const pool = require("../db.js");

 module.exports = function (app) {


     
    //get all flows
    app.get("/api/problems", async (req, res) => {
        try {
            const query = await pool.query("SELECT * FROM flows");
            res.json(query.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    //get flows by user
    app.get("/api/flows/user/:uid", async (req, res) => {
        try {
            const { uid } = req.params;
            const query = await pool.query("SELECT * FROM flows WHERE userid = $1", 
            [parseInt(uid)]);
            res.json(query.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    //create a flow for user
    app.post("/api/flows/create", async (req, res) => {
        try {
            const { uid, flow, active, c } = req.body;
            const query = await pool.query("INSERT INTO flows (userid, flow, active, class) VALUES ($1, $2, $3, $4)", 
            [uid, flow, active, c]);
            res.json(query.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

}