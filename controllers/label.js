/**
 * @file article部分接口逻辑
 * @author vaer
 */
const Article = require('../models/article');
const Label = require('../models/label');
const _ = require('lodash');
const { handleError, handleSuccess } = require('../utils/utils');

// 获取labels数组
const getLabels = async ctx => {
    try {
        const list = await Label.find();
        return handleSuccess({
            data: list.map(item => ({
                name: item.name,
                number: item.number
            }))
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
    try {
        const { request: { body } } = ctx;
        const { labels = [] } = body;
        // 筛选库里labels数组
        let list = (await Label.find());
        let labelsInList = list.map(item => item.name);
        let result;
        labels.forEach(async label => {
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
const delLabels = async (ctx, incomingLabels) => {
    try {
        const { request: { body } } = ctx;
        // 需要删除的标签
        const labels = incomingLabels;
        // 筛选库里labels数组
        let list = await Label.find();
        // 所有的label
        let labelsInList = list.map(item => item.name);
        labels.forEach(async label => {
            // 如果存在该label，如果不存在则不处理
            if (labelsInList.includes(label)) {
                // 获取要删除的标签的id和number
                let { _id, number } = list.filter(i => i.name === label)[0];
                number = number - 1;
                // 数量减一
                if (number <= 0) {
                    // 如果number小于1，则删除该label
                    await Label.deleteOne({ _id });
                } else {
                    // 否则number-1
                    await Label.updateOne({ _id }, { $set: { number } });
                }
            }
        });
        return handleSuccess({
            message: '删除labels成功',
            data: true
        });
    } catch (e) {
        const message = e.message || '删除labels失败';
        return handleError({
            message,
            stack: e
        });
    }
};

// 更新标签
const updateLabels = async (ctx, incomingLabels) => {
    try {
        // 先删除，再添加
        const delRes = await delLabels(ctx, incomingLabels);
        const addRes = await addLabels(ctx);
        if (delRes.status === 0 && addRes.status === 0) {
            return handleSuccess({
                message: '修改labels成功',
                data: true
            });
        } else {
            return handleSuccess({
                message: '修改labels失败',
                data: false
            });
        }
    } catch (e) {
        const message = e.message || '修改labels失败';
        return handleError({
            message,
            stack: e
        });
    }
};

module.exports = {
    getLabels,
    addLabels,
    delLabels,
    updateLabels
};