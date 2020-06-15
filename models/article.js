const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Article = new Schema({
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    labels: [String],
    date: { type: Date, default: new Date()},
    comments: [{ content: String, data: Date }]
});

module.exports = mongoose.model('Article', Article);