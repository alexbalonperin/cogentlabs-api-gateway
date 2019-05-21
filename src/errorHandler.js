module.exports = {
  logErrors: (err, req, res, next) => {
    console.error(err.stack)
    next(err)
  },

  notFound: (req, res) => {
    res.status(404).send("Sorry can't find that!")
  },

  errorHandler: (err, req, res) => {
    res.status(500)
    res.json({ error: 'Something went wrong' })
  }
}
