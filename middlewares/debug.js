/**
 * @file debug
 * @author vaer
 */

const debug =require('debug')('http');
module.exports = async (ctx, next) => {
    const startTime = Date.now();
    await next();
    const time = Date.now() - startTime;
    debug(`${ctx.request.method.toUpperCase()} ${time}ms URL ${ctx.request.url} Response ${JSON.stringify(ctx.response.body)}`);
};