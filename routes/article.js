/**
 * @file 文章操作接口
 * @author vaer
 */
const Router = require('koa-router');
const router = new Router();

const {
    get,
    save,
    del,
    update,
    search
} = require('../controllers/article');

router.post('/get', async ctx => {
    const result = await get(ctx);
    ctx.body = result;
});

router.post('/search', async ctx => {
    const result = await search(ctx);
    ctx.body = result;
})

router.post('/save', async ctx => {
    const result = await save(ctx);
    ctx.body = result;
});

router.post('/update', async ctx => {
    const result = await update(ctx);
    ctx.body = result;
});

router.post('/delete', async ctx => {
    const result = await del(ctx);
    ctx.body = result;
});

module.exports = router.routes();