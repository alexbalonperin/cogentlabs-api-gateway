module.exports = {
  logErrors: (err, req, res, next) => {
    console.error(err.stack)
    next(err)
  },

  notFound: (req, res) => {
    res.status(404).send("Sorry can't find that!")
  },

  errorHandler: (err, req, res) => {
    if (err.message === 'Bad Request') {
      res.status(400).json({ error: err })
    } else {
      res.status(500).json({ error: 'Something went wrong' })
    }
  }
}
