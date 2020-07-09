/**
 * @file 404
 * @author vaer
 */

module.exports = async (ctx, next) => {
    await next();
    if (ctx.response.status === 404) {
        ctx.body = '404';
    }
};