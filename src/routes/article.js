const Router = require('koa-router');

const router = new Router();

router.prefix('/article');

// 获取文章
router.get('/', ctx => {
    ctx.body = 'article';
});
// 

module.exports = router.routes();