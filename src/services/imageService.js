const express = require('express')

const router = express.Router()
const apiAdapter = require('../routers/apiAdapter')

const BASE_URL = 'http://localhost:8000'
const api = apiAdapter(BASE_URL)

router.get('/images/:id', (req, res) => {
  api
    .get(req.path)
    .then(resp => {
      res.send(resp.data)
    })
    .catch(r => {
      console.log('ERROR')
      console.log(r)
    })
})

router.post('/images', (req, res) => {
  api
    .post(req.path, req.body)
    .then(resp => {
      res.send(resp.data)
    })
    .catch(r => {
      console.log('ERROR')
      console.log(r)
    })
})

module.exports = router
