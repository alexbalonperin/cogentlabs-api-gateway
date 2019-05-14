const express = require('express')
const request = require('request')
const multer = require('multer')
const streamBuffers = require('stream-buffers')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router()

const HOST = process.env.IMAGE_SERVICE_HOST || 'localhost'
const PORT = process.env.IMAGE_SERVICE_PORT || 8000
const BASE_URL = `http://${HOST}:${PORT}`

router.get('/images/:id', (req, res) => {
  res.send('OK')
})

router.post('/images', upload.single('img_avatar'), (req, res) => {
  var readableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
    frequency: 1, // in milliseconds.
    chunkSize: 1024 // in bytes.
  })
  readableStreamBuffer.put(req.file.buffer)
  readableStreamBuffer.stop()

  readableStreamBuffer.pipe(
    request.post(BASE_URL + req.path).on('response', (resp) => {
      resp.on('data', (data) => {
        var response = JSON.parse(data)
        res.send(JSON.stringify({id: response.id}))
      })
    })
  )
})

module.exports = router
