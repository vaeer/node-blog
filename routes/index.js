const Router = require('koa-router');
const router = new Router();
const router_article = require('./article');

router.use(router_article);

// 加载html模板
router.use(async ctx => {
    await ctx.render('index');
});

module.exports = router;