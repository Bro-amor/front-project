const express = require("express");
const router = express.Router();
const fs = require("fs");

const slib = require("./serverlib");

router.get("/", (req, res) => {
    let path = req.query.path;
    let fileExtension = (req.query.fileExtension !== "undefined") ? req.query.fileExtension : undefined;

    fs.readdir(path, {withFileTypes: true}, function(error, items) {
        if(error) {
            res.send({error, fileList: [], folderList: []});
            return;
        }

        let files = [];
        let folders = [];

        for(let item of items) {
            if(item.isDirectory()) folders.push(item);
            else if(slib.isFileExtension(item.name, fileExtension)) files.push(item);
        }

        res.send({ fileList: files, folderList: folders });
    })

    return;
});

module.exports = router;