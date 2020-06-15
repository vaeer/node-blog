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
        const { title, content, date} = query;
        const params = {
            title: new RegExp(title, 'i')
        };
        const result = await Article.find(params);
        const list = result.map(item => ({
                title: item.title || '',
                content: item.content || '',
                labels: item.labels || [],
                date: item.date || new Date(),
                comments: item.comments || []
            }));
        console.log('....', err, list);
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
    const { request: { body } } = ctx;
    try {
        const params = _.pick(body, ['title', 'content', 'labels', 'date', 'comments']);
        const article = new Article(params);
        const result = await article.save();
        return handleSuccess({
            message: '保存成功',
            data: true
        });
    } catch (e) {
        const message = e.message || '保存失败';
        return handleError({
            message,
            stack: e,
            data: false
        });
    }
};

const update = async ctx => {

};

const del = async ctx => {

};

module.exports = {
    get,
    save,
    update,
    del
};