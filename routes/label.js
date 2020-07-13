/**
 * @file label接口
 * @author vaer
 */
const Router = require('koa-router');
const router = new Router();
const {
    getLabels,
    addLabels,
    delLabels
} = require('../controllers/label');

router.post('/get', async ctx => {
    ctx.body = await getLabels(ctx);
});

router.post('/add', async ctx => {
    ctx.body = await addLabels(ctx);
});

router.post('/delete', async ctx => {
    ctx.body = await delLabels(ctx);
});

module.exports = router.routes();