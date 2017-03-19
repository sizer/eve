var request = require('supertest');
var app = require('./app');

describe('/', () => {
    it('when get / then response body is hello', (res) => {
        request(app)
            .get('/')
            .expect(200, res)
            .expect('hello', res.body)
    });
});
