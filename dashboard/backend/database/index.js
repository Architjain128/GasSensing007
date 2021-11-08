const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://archit:architjain@cluster0.lz4xn.gcp.mongodb.net/IOT?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose
    .connect(uri, {useNewUrlParser : true , useUnifiedTopology : true})
    .catch(e=>{
        console.error('connection error', e.message)
    })
const db = mongoose.connection
module.exports = db