const express = require('express');
const app = express();
const router = express.Router()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema( 
    {
    title: String,
    author: String,
    imageLink: String,
    language: String,
    year: Number
}
);

module.exports = mongoose.model('Book', BookSchema);