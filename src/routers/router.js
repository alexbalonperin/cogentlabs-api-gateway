const express = require('express')

const router = express.Router()
const imageService = require('../services/imageService')

router.use((req, res, next) => {
  console.log('Called: ', req.path)
  next()
})

router.use(imageService)

module.exports = router
