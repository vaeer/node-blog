/**
 * @file label接口
 * @author vaer
 */
const Router = require('koa-router');
const router = new Router();
const {
    getLabels
} = require('../controllers/label');

router.post('/get', async ctx => {
    ctx.body = await getLabels(ctx);
});

module.exports = router.routes();