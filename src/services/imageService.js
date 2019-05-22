const express = require('express')
const endpoints = require('./endpoints')

const router = express.Router()

router.get('/images/:id/thumbnail', endpoints.thumbnail)

router.post('/images', endpoints.upload)

module.exports = router
