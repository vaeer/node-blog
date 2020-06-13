/**
 * @file 数据库操作
 * @author vaer
 */
const Article = require('../models/article');
const _ = require('lodash');
const { handleError, handleSuccess } = require('../utils/utils');


const get = async ctx => {
    const { request: { query } } = ctx;
    if (query) {
        const params = _.pick(query, ['title']);
        Article.find({title: params.title}, (err, result) => {
            if (err) {
                return handleError(1);
            } else {
                console.log(`params: ${JSON.stringify(params)}, response: ${result}`);
                return handleSuccess(result);
            }
        });
    } else {
        return handleError(1);
    }
}

const save = async ctx => {
    const { request: { query } } = ctx;
    if (query) {
        const params = _.pick(query, ['title', 'content', 'labels', 'date', 'comments']);
        const article = new Article(params);
        const result = await article.save();
        return handleSuccess(result);
    } else {
        return handleError(1);
    }
}

module.exports = {
    get,
    save
};