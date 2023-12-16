const db = require('../config/connection.js');
const mongoose = require('mongoose');

const Blogs = mongoose.model("Blogs", {
    title: String,
    text: String,
    image: String,
    author:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  });

module.exports = Blogs;