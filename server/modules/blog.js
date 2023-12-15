const db = require('./connection.js');
const mongoose = require('mongoose');

const Blogs = mongoose.model("Blogs", {
    title: String,
    text: String,
    image: String,
  });

module.exports = Blogs;