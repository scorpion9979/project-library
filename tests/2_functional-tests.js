/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('Routing tests', function() {

    suite('POST /api/books with title => create book object/expect book object', function() {

      test('Test POST /api/books with title', function(done) {
        chai.request(server)
            .post('/api/books')
            .send({title: '50 Shades of Testing'})
            .end(function(err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.body.title, '50 Shades of Testing');
              done();
            });
      });

      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
            .post('/api/books')
            .send({title: ''})
            .end(function(err, res) {
              assert.equal(res.status, 400);
              assert.equal(res.text, 'missing title');
              done();
            });
      });

    });

    suite('GET /api/books => array of books', function() {

      test('Test GET /api/books',  function(done) {
        chai.request(server)
            .get('/api/books')
            .end(function(err, res) {
              assert.equal(res.status, 200);
              assert.isArray(res.body, 'response should be an array');
              assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
              assert.property(res.body[0], 'title', 'Books in array should contain title');
              assert.property(res.body[0], '_id', 'Books in array should contain _id');
              done();
            });
      });

    });

    suite('GET /api/books/[id] => book object with [id]', function() {

      test('Test GET /api/books/[id] with id not in db',  function(done) {
        chai.request(server)
            .get('/api/books/000000000000000000000000')
            .end(function(err, res) {
              assert.equal(res.status, 400);
              assert.equal(res.text, 'no book exists');
              done();
            });
      });

      test('Test GET /api/books/[id] with valid id in db',  function(done) {
        chai.request(server)
            .get('/api/books/111111111111111111111111')
            .end(function(err, res) {
              assert.equal(res.status, 200);
              assert.property(res.body, 'comments', 'Book should contain comments');
              assert.property(res.body, 'title', 'Book should contain title');
              assert.property(res.body, '_id', 'Book should contain _id');
              assert.isArray(res.body.comments, 'Comments should be an array');
              done();
            });
      });

    });

    suite('POST /api/books/[id] => add comment/expect book object with id', function() {

      test('Test POST /api/books/[id] with comment', function(done) {
        // done();
      });

    });

  });

});
