/**
 * @file 数据库操作
 * @author vaer
 */
const Article = require('../models/article');
const _ = require('lodash');
const moment = require('moment');
const { handleError, handleSuccess } = require('../utils/utils');

// 获取文章列表
const get = async ctx => {
    const { request: { body } } = ctx;
    try {
        const { title, pageNo, pageSize } = body;
        // 模糊匹配
        const params = {
            title: new RegExp(title, 'i')
        };
        // 分页，时间倒序
        const result = await Article.find(params)
            .limit(pageSize)
            .skip((pageNo - 1) * pageSize)
            .sort({date: -1});
        const total = await Article.countDocuments();
        const list = result.map(item => ({
                title: item.title || '',
                content: item.content || '',
                labels: item.labels || [],
                date: item.date || moment().format('YYYY-MM-DD'),
                comments: item.comments || []
            }));
        return handleSuccess({
            data: {
                list: list || [],
                total: total || 0,
                pageNo: pageNo,
                pageSize: pageSize
            }
        });
    } catch (e) {
        return handleError({
            message: '获取列表失败',
            stack: e
        });
    }
};

// 全局搜索
const search = async ctx => {
    const { request: { body } } = ctx;
    try {
        const params = _.pick(body, ['keyword']);
        const list = Article.find(params).sort({_id: -1});
        return handleSuccess({
            data: {
                list: list || []
            }
        });
    } catch (e) {
        return handleError({
            message: '获取列表失败',
            stack: e
        });
    }
};

// 保存文章
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

// 更新文章
const update = async ctx => {

};

// 删除文章
const del = async ctx => {

};

module.exports = {
    get,
    search,
    save,
    update,
    del
};