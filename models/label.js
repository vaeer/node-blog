const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const Label = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
});

Label.plugin(uniqueValidator);

module.exports = mongoose.model('labels', Label);