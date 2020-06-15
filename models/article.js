const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const moment = require('moment');
const Schema = mongoose.Schema;

const Article = new Schema({
    title: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    labels: [String],
    date: {
        type: String,
        default: moment().format('YYYY-MM-DD HH:MM')
    },
    comments: [
        { content: String, date: String }
    ]
});

Article.plugin(uniqueValidator);

module.exports = mongoose.model('articles', Article);