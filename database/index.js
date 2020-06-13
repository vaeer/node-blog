const mongoose = require('mongoose');

const env = process.env.NODE_ENV;
const config = require('../config/config.dev');

const db = mongoose.connect(config.mongodbUrl, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('数据库连接成功');
    }
});


module.exports = db;