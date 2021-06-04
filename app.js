const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');
const Cars = require('./data')
//import Cars from './data.js';

const app = express();

app.listen(3010, () => {
    console.log("server runing on port 3010");
})

app.get("/getSite", (req,res) =>{
    res.send(Cars);
} )