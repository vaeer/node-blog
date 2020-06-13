/**
 * @file 文章操作接口
 * @author vaer
 */
const Router = require('koa-router');
const router = new Router();

const {
    get,
    save
} = require('../controllers/article');

router.get('/get', async ctx => {
    const result = await get(ctx);
    ctx.body = result;
});

router.get('/save', async ctx => {
    const result = await save(ctx);
    ctx.body = result;
})

module.exports = router.routes();