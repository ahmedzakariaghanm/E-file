const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    notes: {
        type:String
    },
    user: {
        type:String
    }

},{collection:'contacts'})

const model =mongoose.model('contacts', Schema)
module.exports = model