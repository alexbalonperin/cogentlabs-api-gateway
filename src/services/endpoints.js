const request = require('request')
const path = require('path')
const streamBuffers = require('stream-buffers')

const HOST = process.env.IMAGE_SERVICE_HOST || 'localhost'
const PORT = process.env.IMAGE_SERVICE_PORT || 8000
const BASE_URL = `http://${HOST}:${PORT}`

module.exports = {
  upload: (req, res, next) => {
    if (req.file === undefined) next(Error('Undefined request file'))

    var readableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
      frequency: 1, // in milliseconds.
      chunkSize: 1024 // in bytes.
    })
    readableStreamBuffer.put(req.file.buffer)
    readableStreamBuffer.stop()

    const options = {
      url: BASE_URL + req.path,
      headers: {
        'FILE-EXTENSION': path.extname(req.file.originalname)
      }
    }

    readableStreamBuffer.pipe(
      request.post(options).on('response', resp => {
        resp.on('data', data => {
          var response = JSON.parse(data)
          res.send(JSON.stringify({ id: response.id }))
        })
      })
    )
  },

  thumbnail: (req, res) => {
    request.get(BASE_URL + req.path).on('response', resp => {
      resp.on('data', data => {
        res.send(data)
      })
    })
  }
}
