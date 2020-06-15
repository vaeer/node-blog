const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Article = new Schema({
    title: { type: String, default: '', index: true, unique: true, required: true },
    content: { type: String, default: '', required: true },
    labels: [String],
    date: { type: Date, default: new Date()},
    comments: [{ content: String, data: Date }]
});

module.exports = mongoose.model('articles', Article);