const express = require('express');
const app = express();
const router = express.Router()
const mongoose = require('mongoose'),
    mongooseHistory = require('mongoose-history');
const Schema = mongoose.Schema;

const HistorySchema = new Schema( 
    {
    title: String,
    message: String,
    updated_for: String
}
);

module.exports = mongoose.model('History', HistorySchema);