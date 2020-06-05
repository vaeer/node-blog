/**
 * @file x-response-time
 * @author vaer
 */

module.exports = async (ctx, next) => {
    const startTime = Date.now();
    await next();
    const time = Date.now() - startTime;
    ctx.set('X-Response-Time', `${time}ms`);
};