const mongoose = require('mongoose');
const debug = require('debug')('http');
const env = process.env.NODE_ENV;
const devConfig = require('../config/config.dev');
const prodConfig = require('../config/config');

const { mongodbUrl } = env === 'development' ? devConfig : prodConfig;
mongoose.set('useCreateIndex', true);
const db = mongoose.connect(mongodbUrl, { keepAlive: 120 }, err => {
    if (err) {
        debug(err);
    } else {
        debug('数据库连接成功');
    }
});


module.exports = db;