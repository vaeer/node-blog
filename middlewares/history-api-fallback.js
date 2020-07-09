/**
 * @file 配置白名单的路由，由前端路由接管
 * @author vaer
 */
const {whiteList} = require('../config/config');
const path = require('path');
const fs = require('fs');

module.exports = async (ctx, next) => {
    // 前端路由白名单
    await next();
    if (whiteList.includes(ctx.request.url)) {
        ctx.type = 'text/html; charset=utf-8' // 修改响应类型
        ctx.body = fs.readFileSync(path.join(__dirname, '../public/index.html'))
    } 
};