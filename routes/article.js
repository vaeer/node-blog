/**
 * @file 文章操作接口
 * @author vaer
 */
const Router = require('koa-router');
const router = new Router();

const {
    getArticles,
    getArticlesByLabel,
    saveArticle,
    delArticle,
    updateArticle,
    searchArticles,
    getDetail
} = require('../controllers/article');

router.post('/get', async ctx => {
    ctx.body = await getArticles(ctx);
});

router.post('/getByLabel', async ctx => {
    ctx.body = await getArticlesByLabel(ctx);
});

router.post('/search', async ctx => {
    ctx.body = await searchArticles(ctx);
});

router.post('/detail', async ctx => {
    ctx.body = await getDetail(ctx);
});

router.post('/save', async ctx => {
    ctx.body = await saveArticle(ctx);
});

router.post('/update', async ctx => {
    ctx.body = await updateArticle(ctx);
});

router.post('/delete', async ctx => {
    ctx.body = await delArticle(ctx);
});

module.exports = router.routes();