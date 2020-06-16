/**
 * @file label接口
 * @author vaer
 */
const Router = require('koa-router');
const router = new Router();
const {
    get
} = require('../controllers/label');

router.post('/get', async ctx => {
    const result = await get(ctx);
    ctx.body = result;
});

module.exports = router.routes();