const express = require('express');
const app = express();
const router = express.Router()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema( 
    {
    author: String,
    country: String,
    imageLink: String,
    language: String,
    link: String,
    pages: Number,
    title: String,
    year: Number
}
);

module.exports = mongoose.model('Book', BookSchema);