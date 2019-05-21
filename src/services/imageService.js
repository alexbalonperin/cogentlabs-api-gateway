const express = require('express')
const multer = require('multer')
const endpoints = require('./endpoints')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router()

router.get('/images/:id/thumbnail', endpoints.thumbnail)

router.post('/images', upload.single('img'), endpoints.upload)

module.exports = router
