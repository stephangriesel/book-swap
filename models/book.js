const express = require('express');
const app = express();
const router = express.Router()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./user');

const BookSchema = new Schema( 
    {
    title: String,
    author: String,
    imageLink: String,
    language: String,
    year: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
}
);

module.exports = mongoose.model('Book', BookSchema);