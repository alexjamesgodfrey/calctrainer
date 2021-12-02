/**
 * MAIN ROUTES
 */
 const pool = require("../db.js");

 module.exports = function (app) {

    //get all problems
    app.get("/api/problems", async (req, res) => {
        try {
            const query = await pool.query("SELECT * FROM problems ORDER BY section ASC");
            res.json(query.rows);
        } catch (err) {
            console.error(err.message);
        }
    })
     
    //get problems based on section
    app.get("/api/section/:section", async (req, res) => {
        try {
            const { section } = req.params
            const query = await pool.query("SELECT * FROM problems WHERE section=$1",
            [section]);
            res.json(query.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    //get problems based on section and subsection
    app.get("/api/problems/:section/:subsection", async (req, res) => {
        try {
            const { section, subsection } = req.params
            const query = await pool.query("SELECT * FROM problems WHERE section=$1 AND subsection=$2",
            [section, subsection]);
            res.json(query.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    //create a problem
    app.post("/api/problems", async (req, res) => {
        try {
            const { answer, section, subsection, math } = req.body;
            const query = await pool.query("INSERT INTO problems (answer, section, subsection, math) VALUES ($1, $2, $3, $4)", 
            [answer, section, subsection, math]);
            res.json(query.rows);
        } catch (err) {
            console.error(err.message);
        }
    })
     
     //delete all problems
    app.delete("/api/deleteall", async (req, res) => {
        try {
            const query = await pool.query("DELETE FROM problems WHERE id != 999");
            res.json(query.rows);
        } catch (err) {
            console.error(err.message);
        }
    })
     
     //delete a problems
    app.delete("/api/delete/:id", async (req, res) => {
        try {
            const { id } = req.params
            const query = await pool.query("DELETE FROM problems WHERE id=$1",
            [id]);
            res.json(query.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

}