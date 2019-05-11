const express = require('express')
const fileUpload = require('express-fileupload')

const router = express.Router()
const apiAdapter = require('../routers/apiAdapter')

const HOST = process.env.IMAGE_SERVICE_HOST || 'localhost'
const PORT = process.env.IMAGE_SERVICE_PORT || 8000
const BASE_URL = `http://${HOST}:${PORT}`
const api = apiAdapter(BASE_URL)

router.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
  })
)

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
