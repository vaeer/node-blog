const Router = require('koa-router');

const router = new Router();

router.prefix('/article');

module.exports = router.routes();