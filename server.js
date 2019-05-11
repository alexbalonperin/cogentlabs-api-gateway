process.title = 'api-gateway'

const express = require('express')
const app = express()
const router = require('./src/routers/router')
const bodyParser = require('body-parser')

const HOST = process.env.API_HOST || 'localhost'
const PORT = process.env.API_PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Simple API Gateway')
})

app.use(router)

console.log(`Simple API Gateway run on ${HOST}:${PORT}`)

app.listen(PORT, HOST)
