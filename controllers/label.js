/**
 * @file article部分接口逻辑
 * @author vaer
 */
const Article = require('../models/article');
const Label = require('../models/label');
const _ = require('lodash');
const moment = require('moment');
const { handleError, handleSuccess, escapeRegex } = require('../utils/utils');

// 获取labels数组
const getLabels = async ctx => {
    try {
        const data = (await Label.find()).map(item => item.name);
        return handleSuccess({
            data
        });
    } catch (e) {
        const message = e.message || '获取labels失败';
        return handleError({
            message,
            stack: e
        });
    }
};

// 新增标签
const addLabels = async ctx => {
    const { request: { body } } = ctx;
    const { labels } = body;
    try {
        // 筛选库里labels数组
        let list = (await Label.find());
        let result;
        labels.forEach(async label => {
            let labelsInList = list.map(item => item.name);
            // 如果已存在该label
            if (labelsInList.includes(label)) {
                let { _id, number } = list.filter(i => i.name === label)[0];
                // 数量加一
                result = await Label.updateOne({ _id }, { $set: { number: ++number } });
            } else {
                result = new Label({
                    name: label,
                    number: 1
                });
                await result.save();
            }
        });
        return handleSuccess({
            message: '添加labels成功',
            data: true
        });
    } catch (e) {
        const message = e.message || '添加labels失败';
        return handleError({
            message,
            stack: e
        });
    }
};

// 删除标签
const delLabels = async ctx => {
    try {

    } catch (e) {

    }
};

// 更新标签
const updateLabels = async ctx => {
    try {

    } catch (e) {

    }
};

module.exports = {
    getLabels,
    addLabels,
    delLabels,
    updateLabels
};