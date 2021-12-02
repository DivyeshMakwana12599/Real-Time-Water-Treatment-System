const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to Pipe Application. Designed to cure the problem of water monetring system")
});

module.exports = router;