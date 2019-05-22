const nock = require('nock')
const request = require('supertest')

const server = require('../../server')
const app = server.app

describe('GET /', () => {
  it('should return 200', () => {
    request(app)
      .get('/')
      .expect(200)
  })
})

const HOST = process.env.IMAGE_SERVICE_HOST || 'localhost'
const PORT = process.env.IMAGE_SERVICE_PORT || 8000
const BASE_URL = `http://${HOST}:${PORT}`
nock(BASE_URL)
  .get('/images')
  .reply(200, { 'id': 123 })

describe('POST /images', () => {
  it('Accept uploaded images', () => {
    request(app)
      .post('/images')
      .attach('img', 'tests/fixtures/niijima.jpg')
      .expect(200)
      .end(function (err, res) {
        if (err) throw err
      })
  })
})

describe('POST /does-not-exist', () => {
  it('Returns 404 not found', () => {
    var result = request(app)
      .post('/does-not-exist')
      .expect(404)
      .end(function (err, res) {
        if (err) throw err
      })
  })
})
