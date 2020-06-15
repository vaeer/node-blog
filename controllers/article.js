/**
 * @file 数据库操作
 * @author vaer
 */
const Article = require('../models/article');
const _ = require('lodash');
const { handleError, handleSuccess } = require('../utils/utils');


const get = async ctx => {
    const { request: { query } } = ctx;
    try {
        const params = _.pick(query, ['title']);
        const result = await Article.find(params);
        const list = result.map(item => ({
                title: item.title || '',
                content: item.content || '',
                labels: item.labels || [],
                date: item.date || new Date(),
                comments: item.comments || []
            }));
        return handleSuccess({
            data: {
                list: list || [],
                total: result.length || 0,
                pageNo: 1,
                pageSize: 1
            }
        });
    } catch (e) {
        return handleError({
            message: '获取列表失败',
            stack: e
        });
    }
};

const save = async ctx => {
    const { request: { query } } = ctx;
    try {
        const params = _.pick(query, ['title', 'content', 'labels', 'date', 'comments']);
        const article = new Article(params);
        const result = await article.save();
        return handleSuccess({
            message: '保存成功',
            data: true
        });
    } catch (e) {
        return handleError({
            message: '保存失败',
            stack: e,
            data: false
        });
    }
};

module.exports = {
    get,
    save
};