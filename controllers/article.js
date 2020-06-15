/**
 * @file article部分接口逻辑
 * @author vaer
 */
const Article = require('../models/article');
const Label = require('../models/label');
const _ = require('lodash');
const moment = require('moment');
const { handleError, handleSuccess, escapeRegex } = require('../utils/utils');

// 获取文章列表
const get = async ctx => {
    const { request: { body } } = ctx;
    try {
        const { title = '', pageNo = 1, pageSize = 10} = body;
        // 模糊匹配
        const params = {
            title: new RegExp(escapeRegex(title), 'i')
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
        const message = e.message || '获取列表失败';
        console.log(e);
        return handleError({
            message,
            stack: e
        });
    }
};

// 全局搜索
const search = async ctx => {
    const { request: { body } } = ctx;
    try {
        const { keyword = '' } = body;
        const params = {
            $or: [
                { title: new RegExp(escapeRegex(keyword), 'i') },
                { content: new RegExp(escapeRegex(keyword), 'i') }
            ]
        };
        const list = await Article.find(params, { title: 1, content: 1, _id: 0});
        return handleSuccess({
            data: {
                list: list || []
            }
        });
    } catch (e) {
        const message = e.message || '获取列表失败';
        return handleError({
            message,
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
    const { request: { body } } = ctx;
    try {
        const { title, ...update } = body;
        const result = await Article.updateOne({ title }, { $set: update });
        if (result.ok) {
            return handleSuccess({
                message: '修改成功',
                data: true
            });
        } else {
            return handleError({
                message: '修改失败',
                data: false
            });
        }
    } catch (e) {
        const message = e.message || '修改失败';
        return handleError({
            message,
            stack: e,
            data: false
        });
    }
};

// 删除文章
const del = async ctx => {
    const { request: { body } } = ctx;
    try {
        const params = _.pick(body, ['title']);
        const result = await Article.deleteOne(params);
        if (result.ok && result.deletedCount) {
            return handleSuccess({
                message: '修改成功',
                data: true
            });
        } else {
            return handleError({
                message: '删除失败，title不存在',
                data: false
            });
        }
    } catch (e) {
        const message = e.message || '删除失败';
        return handleError({
            message,
            stack: e,
            data: false
        });
    }
};

module.exports = {
    get,
    search,
    save,
    update,
    del
};