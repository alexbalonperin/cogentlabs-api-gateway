process.title = 'api-gateway'

var express = require('express')
var app = express()
var router = require('./src/routers/router')
var bodyParser = require('body-parser')

const PORT = 8080
const HOST = 'localhost'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Simple API Gateway')
})

app.use(router)

console.log(`Simple API Gateway run on ${HOST}:${PORT}`)

app.listen(HOST, PORT)
