const request = require('request')
const path = require('path')
const streamBuffers = require('stream-buffers')
const multer = require('multer')

const storage = multer.memoryStorage()
const uploadSingle = multer({
  storage: storage,
  limits: {
    fileSize: 5000000 // 5MB
  }
}).single('img')

const HOST = process.env.IMAGE_SERVICE_HOST || 'localhost'
const PORT = process.env.IMAGE_SERVICE_PORT || 8000
const BASE_URL = `http://${HOST}:${PORT}`

module.exports = {
  upload: (req, res, next) => {
    uploadSingle(req, res, err => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.error(err)
        next(new Error('Bad Request'))
      } else if (err) {
        // An unknown error occurred when uploading.
        console.error(err)
        next(err)
      }
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
        request
          .post(options)
          .on('response', resp => {
            resp.on('data', data => {
              var response = JSON.parse(data)
              res.send(JSON.stringify({ id: response.id }))
            })
          })
          .on('error', err => {
            next(new Error(err))
          })
      )
    })
  },

  thumbnail: (req, res) => {
    request.get(BASE_URL + req.path).on('response', resp => {
      resp.on('data', data => {
        res.send(data)
      })
    })
  }
}
