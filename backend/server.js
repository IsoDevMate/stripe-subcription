
const express = require('express')
const app=express()
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const routing =require('./routes/routing')
const port = process.env.PORT || 8090



app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.use('/api',routing)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})