const Router = require('koa-router');
const router = new Router();
const router_article = require('./article');
const router_label = require('./label');

const isDev = process.env.NODE_ENV === 'development';

router.prefix(isDev ? '/mock': '');

router.use('/article', router_article);
router.use('/label', router_label);

// 加载html模板
router.use(async ctx => {
    await ctx.render('index');
});

module.exports = router;