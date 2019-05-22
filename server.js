process.title = 'api-gateway'

const express = require('express')
const app = express()
const router = require('./src/routers/router')
const errorHandler = require('./src/errorHandler')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const methodOverride = require('method-override')

const HOST = process.env.API_HOST || 'localhost'
const PORT = process.env.API_PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('common'))
app.use(methodOverride())

app.get('/healthz', (req, res) => {
  res.send('OK')
})

app.use(router)
app.use(errorHandler.logErrors)
app.use(errorHandler.notFound)
app.use(errorHandler.errorHandler)

app.listen(PORT, HOST, () => console.log(`Simple API Gateway run on ${HOST}:${PORT}`))
module.exports.app = app
