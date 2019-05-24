const nock = require('nock')
const request = require('supertest')

const server = require('../../server')
const app = server.app

const HOST = process.env.IMAGE_SERVICE_HOST || 'localhost'
const PORT = process.env.IMAGE_SERVICE_PORT || 8000
const IMAGE_SERVICE_BASE_URL = `http://${HOST}:${PORT}`

describe('GET /healthz', () => {
  it('should return 200', () => {
    request(app)
      .get('/healthz')
      .expect(200)
  })
})

describe('POST /images', () => {
  it('Accept small uploaded images', () => {
    const expected = 123

    nock(IMAGE_SERVICE_BASE_URL)
      .get('/images')
      .reply(200, { 'id': expected })

    request(app)
      .post('/images')
      .attach('img', 'tests/fixtures/small.jpg')
      .expect(200)
      .end(function (err, res) {
        if (err) throw err
        expect(res.id).to.be.equal(expected)
      })
  })

  it('Accept large uploaded images', () => {
    const expected = 123

    nock(IMAGE_SERVICE_BASE_URL)
      .get('/images')
      .reply(200, { 'id': expected })

    request(app)
      .post('/images')
      .attach('img', 'tests/fixtures/large.jpg')
      .expect(200)
      .end(function (err, res) {
        if (err) throw err
        expect(res.id).to.be.equal(expected)
      })
  })

  it('Accept uploaded images with different formats (png, gif, jpg)', () => {
    const expected = 123
    files = ['small.jpg', 'test.gif', 'test.png']

    nock(IMAGE_SERVICE_BASE_URL)
      .get('/images')
      .reply(200, { 'id': expected })

    for (var i = 0; i < files.length; i++) {
      request(app)
        .post('/images')
        .attach('img', 'tests/fixtures/' + files[i])
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          expect(res.id).to.be.equal(expected)
        })
    }
  })

  it('Fail when image service is unavailable', () => {
    request(app)
      .post('/images')
      .attach('img', 'tests/fixtures/small.jpg')
      .expect(500)
      .end(function (err, res) {
        if (err) throw err
      })
  })
})

describe('POST /does-not-exist', () => {
  it('Returns 404 not found', () => {
    request(app)
      .post('/does-not-exist')
      .expect(404)
      .end(function (err, res) {
        if (err) throw err
      })
  })
})
