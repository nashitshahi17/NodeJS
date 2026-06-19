const express = require('express')
const urlRoute = require('./routes/url')
const {connectMongoDB} = require('./connect')

const app = express()
const PORT = 8001

connectMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=>{console.log("MongoDB Connected")})

app.use(express.json())
app.use('/url',urlRoute)

app.listen(PORT,()=>{console.log(`Server Started at PORT: ${PORT}`)})