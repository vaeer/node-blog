/**
 * @file article部分接口逻辑
 * @author vaer
 */
const Article = require('../models/article');
const _ = require('lodash');
const moment = require('moment');
const { handleError, handleSuccess, escapeRegex, removeHtml } = require('../utils/utils');
const { addLabels, delLabels } = require('../controllers/label');

// 获取文章列表
const getArticles = async ctx => {
    const { request: { body } } = ctx;
    try {
        const { pageNo = 1, pageSize = 10, keywords} = body;
        // 传keyword时为全局搜索，不传时为获取全部内容
        const params = keywords
            ? {
                $or: [
                    { title: new RegExp(escapeRegex(keywords), 'i') },
                    { content: new RegExp(escapeRegex(keywords), 'i') }
                ]
            } : {}
        // 分页，时间倒序
        const result = await Article.find(params)
            .limit(pageSize)
            .skip((pageNo - 1) * pageSize)
            .sort({date: -1});
        const total = await Article.countDocuments(params);
        const list = result.map(item => ({
                title: item.title || '',
                content: removeHtml(item.content.slice(0, 200)) || '',
                labels: item.labels || [],
                date: item.date || moment().format('YYYY-MM-DD'),
                uid: item._id
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
        return handleError({
            message,
            stack: e
        });
    }
};

// 根据标签获取文章
const getArticlesByLabel = async ctx => {
    const { request: { body } } = ctx;
    const { label } = body;
    try {
        let list = await Article.find();
        list = list.filter(item => Array.isArray(item.labels) && item.labels.includes(label))
            .map(item => ({
                title: item.title || '',
                content: item.content.slice(0, 120) || '',
                labels: item.labels || [],
                date: item.date || moment().format('YYYY-MM-DD'),
                uid: item._id
            }));
        return handleSuccess({
            data: {
                list: list || [],
                total: list.length || 0
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

// 获取文章详情
const getDetail = async ctx => {
    const { request: { body } } = ctx;
    try {
        const { uid } = body;
        const result = await Article.findById(uid);
        const { labels, date, title, content, comments } = result;
        return handleSuccess({
            data: {
                labels,
                date,
                title,
                content,
                comments
            }
        });
    } catch (e) {
        const message = e.message || '获取文章详情失败';
        return handleError({
            message,
            stack: e
        });
    }
}

// 全局搜索
const searchArticles = async ctx => {
    const { request: { body } } = ctx;
    try {
        const { keywords = '' } = body;
        const params = {
            $or: [
                { title: new RegExp(escapeRegex(keywords), 'i') },
                { content: new RegExp(escapeRegex(keywords), 'i') }
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
const saveArticle = async ctx => {
    const { request: { body } } = ctx;
    try {
        const params = _.pick(body, ['title', 'content', 'labels', 'date', 'comments']);
        const article = new Article(params);
        await article.save();
        // 添加标签
        const addLabelRes = await addLabels(ctx);
        if (addLabelRes.status === 0) {
            return handleSuccess({
                message: '保存成功',
                data: true
            });
        }
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
const updateArticle = async ctx => {
    const { request: { body } } = ctx;
    try {
        const { uid, ...update } = body;
        const result = await Article.updateOne({ _id: uid }, { $set: update });
        if (result.ok && result.nModified) {
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
const delArticle = async ctx => {
    const { request: { body } } = ctx;
    const { uid } = body;
    try {
        const labels = (await Article.findById(uid)).labels || [];
        const result = await Article.deleteOne({ _id: uid });
        // 删除label
        const delLabelRes = await delLabels(ctx, labels);
        if (result.ok && result.deletedCount && delLabelRes.status === 0) {
            return handleSuccess({
                message: '删除成功',
                data: true
            });
        } else {
            return handleError({
                message: '删除失败，文章不存在',
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
    getArticles,
    getArticlesByLabel,
    searchArticles,
    getDetail,
    saveArticle,
    updateArticle,
    delArticle
};