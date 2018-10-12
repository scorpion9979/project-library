/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const CONNECTION_STRING = process.env.DB;
mongoose.connect(CONNECTION_STRING);

const Schema = mongoose.Schema;
const bookSchema = new Schema({
  _id: {type: String, required: true},
  title: {type: String, required: true},
  comments: {type: [String], required: false, default: []},
});
const Book = mongoose.model('Book', bookSchema);

module.exports = function(app) {

  app.route('/api/books')
    .get(function(req, res) {
      // response will be array of book objects
      // json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      Book.find({}, function(err, books) {
        if (err) {
          res.status(400)
             .send(err);
        } else {
          let result = books.map(e => ({
            _id: e._id,
            title: e.title,
            commentcount: e.comments.length,
          }));
          res.status(200)
             .send(result);
        }
      });
    })

    .post(function(req, res) {
      let title = req.body.title;
      let id = new ObjectId();
      let book = new Book({
        _id: id,
        title: title,
      });
      book.save(function(err, doc) {
        if (err) {
          res.status(400)
             .send('missing title');
        } else {
          res.status(200)
             .send(doc);
        }
      });
    })

    .delete(function(req, res) {
      // if successful response will be 'complete delete successful'
    });

  app.route('/api/books/:id')
    .get(function(req, res) {
      let bookid = req.params.id;
      Book.findById(bookid, function(err, book) {
        if (!book) {
          res.status(400)
             .send('no book exists');
        } else {
          res.status(200)
             .send(book);
        }
      });
    })

    .post(function(req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      Book.findById(bookid, function(error, book) {
        if (!book) {
          res.status(400)
             .send('no book exists');
        } else {
          book.comments.push(comment);
          book.save(function(err, doc) {
            if (err) {
              res.status(400)
                .send(err);
            } else {
              res.status(200)
                .send(doc);
            }
          });
        }
      });
    })

    .delete(function(req, res) {
      var bookid = req.params.id;
      // if successful response will be 'delete successful'
    });

};
