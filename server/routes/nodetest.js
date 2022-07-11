const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

    let getStr = req.query.str;
    let getNum = Number(req.query.number);

    console.log(`getStr : ${getStr}, type : ${typeof getStr}`);
    console.log(`getNum : ${getNum}, type : ${typeof getNum}`);

    console.log("connect!!");
    res.send({ result: "success" });

    return;
});

module.exports = router;