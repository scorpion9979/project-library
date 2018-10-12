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
    })

    .post(function(req, res) {
      var title = req.body.title;
      // response will contain new book object including atleast _id and title
    })

    .delete(function(req, res) {
      // if successful response will be 'complete delete successful'
    });

  app.route('/api/books/:id')
    .get(function(req, res) {
      var bookid = req.params.id;
      // json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(function(req, res) {
      var bookid = req.params.id;
      var comment = req.body.comment;
      // json res format same as .get
    })

    .delete(function(req, res) {
      var bookid = req.params.id;
      // if successful response will be 'delete successful'
    });

};
