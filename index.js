const express = require('express');
var bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const cors = require('cors')
const MOCK = require('./ANIMAL')
const app = express();

const PORT = 1203;

//file import
app.use(fileUpload());

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/animals', (req, res) => {
  return res.send(MOCK);
});

app.get('/animals/:id', (req, res) => {
  const { id } = req.params;
  const animal = MOCK.find((selected) => selected.id.toString() === id.toString());
  return res.send(animal);
});

app.put('/animals/:id', (req, res) => {
  const { id } = req.params;
  const { sci_name, common_name, endanger_level } = req.body;
  const selecteKey = MOCK.findIndex((selected) => selected.id.toString() === id.toString());
  MOCK[selecteKey] = {
    id,
    sci_name, common_name, endanger_level
  }
  return res.send(MOCK);
});

app.post('/add-animal', (req, res) => {
  const { sci_name, common_name, endanger_level } = req.body;
  MOCK.push({
    id: MOCK.length+1,
    sci_name,
    common_name,
    endanger_level,
  });
  return res.send(MOCK);
})

app.post('/import-animal', (req, res) => {
  console.log(req.files);
});

app.post('/trustFundApplication', (req, res) => {
  const MOCK = require('./adb/trustFundApplication.json');
  return res.send(MOCK);
})


app.post('/fund/hltf', (req, res) => {
  const MOCK = require('./adb/hltf.json');
  return res.send(MOCK);
})
app.get('/restv2/applicationDetails', (req, res) => {
  const MOCK = require('./adb/applicationDetails.json');
  return res.send(MOCK);
})

app.post('/restv2/fund', (req, res) => {
  const MOCK = require('./adb/prcfFund.json');
  return res.send(MOCK);
});

app.post('/restv2/task', (req, res) => {
  const MOCK = require('./adb/hltf_task.json');
  return res.send(MOCK);
});

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);

