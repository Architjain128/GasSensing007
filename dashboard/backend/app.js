const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const Port = 6050
const db = require('./database/index')

app.use(bodyParser.urlencoded({extended : true , limit:'50mb'}))
app.use(cors())
app.use(bodyParser.json({limit:'50mb'}))
app.use(express.static('public'))
app.use(require('./routes/keys'))


db.once('open', ()=> console.log("connected to db"))
db.on('error', ()=> console.error('oops cannot connect to db'))

app.listen(Port , ()=>{
    console.log("yup!!!",Port)
})