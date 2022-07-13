const express = require('express');
const app = express();
const nodetest = require('./routes/nodetest');
const getFileFolderList = require('./routes/getFileFolderList');
const fileSave = require('./routes/fileSave');

const cors = require('cors');

const bodyParser = require('body-parser');

const fs = require('fs');

app.use(cors());

app.use(bodyParser.json());

app.use('/nodetest', nodetest);
app.use('/getFileFolderList', getFileFolderList);
app.use('/fileSave', fileSave);

const PORT = process.env.PORT || 5000;




app.get('/', (req, res) => {
    res.send("server page");
})

// app.get('/api/dataSample', (req, res) => {
//     res.set("Content-Type","text/xml");
//     res.send(
//         '<View>\n'+
//         '   <Image name="image" value="$image" />\n'+
//         '</View>'
//     );
// })

// app.post('/api/dataHtml', (req, res) => {
//     html.concat(req.body);
//     res.set("Content-Type","text/xml");
//     res.send(req.body);
// })

// app.post('/api/dataProperty', (req, res) => {
//     html.concat(req.body);
//     res.set("Content-Type","text/csv");
//     res.send(req.body);
// })

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})
