/**
 * @file article部分接口逻辑
 * @author vaer
 */
const Article = require('../models/article');
const _ = require('lodash');
const moment = require('moment');
const { handleError, handleSuccess, escapeRegex } = require('../utils/utils');

// 获取labels数组
const get = async ctx => {
    try {
        return handleSuccess({
            data: ['react', 'js']
        });
    } catch (e) {

    }
};

module.exports = {
    get
};