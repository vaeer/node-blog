/**
 * @file 文章操作接口
 * @author vaer
 */
const Router = require('koa-router');
const router = new Router();

const {
    get,
    getByLabel,
    save,
    del,
    update,
    search,
    detail
} = require('../controllers/article');

router.post('/get', async ctx => {
    ctx.body = await get(ctx);
});

router.post('getByLabel', async ctx => {
    ctx.body = await getByLabel(ctx);
});

router.post('/search', async ctx => {
    ctx.body = await search(ctx);
});

router.post('/detail', async ctx => {
    ctx.body = await detail(ctx);
});

router.post('/save', async ctx => {
    ctx.body = await save(ctx);
});

router.post('/update', async ctx => {
    ctx.body = await update(ctx);
});

router.post('/delete', async ctx => {
    ctx.body = await del(ctx);
});

module.exports = router.routes();