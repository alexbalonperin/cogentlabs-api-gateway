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
