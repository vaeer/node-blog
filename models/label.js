const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const Label = new Schema({
    label: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    title: {
        type: String,
        unique: true,
        index: true,
        required: true
    }
});

Label.plugin(uniqueValidator);

module.exports = mongoose.model('labels', Label);