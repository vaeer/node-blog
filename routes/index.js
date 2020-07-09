const Router = require('koa-router');
const fs = require('fs');
const router = new Router();
const router_article = require('./article');
const router_label = require('./label');

const isDev = process.env.NODE_ENV === 'development';

router.prefix(isDev ? '/mock': '');

router.use('/article', router_article);
router.use('/label', router_label);


module.exports = router;