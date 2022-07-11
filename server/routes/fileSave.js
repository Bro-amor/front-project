const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post("/", (req, res) => {
    let fileName = req.query.fileName;
    let content = req.body.file;

    fs.writeFile(fileName, content, "utf-8", function(error) {
        console.log("write end");
    });

    res.send({ result: "success" });
});

module.exports = router;