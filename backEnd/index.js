const express = require('express')
const app = express()
const fs = require('fs');
const bodyParser = require('body-parser')
// const fetch = require('node-fetch')
const path = require('path')
const mongoose = require('mongoose')
const routes = require('./routes');
var cors        = require('cors');
app.use(cors());
mongoose.connect('mongodb://localhost/contacts',{ useUnifiedTopology: true, useNewUrlParser: true , useCreateIndex: true,useFindAndModify: false})
// var key = fs.readFileSync('key.pem');
// var cert = fs.readFileSync( 'cert.pem' );
// var options = {
//     key: key,
//     cert: cert
//   };

// app.use('/',express.static(path.join(__dirname,'src')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use('/',routes)

var server = require('http').createServer(app);

server.listen(5000, _=>console.log('Listenning'))