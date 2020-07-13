/**
 * @file 应用入口文件
 * @author vaer
 */

const Koa = require('koa');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const loadMiddlewares = require('./middlewares');
require('./database');
const debug = require('debug')('http');

const PORT = process.env.PORT || 4000;

const app = new Koa();
const router = require('./routes');

app.use(bodyParser());
// 加载中间件
loadMiddlewares(app);

app.use(router.routes(), router.allowedMethods());

app.use(koaStatic(path.join(__dirname, './public')));

app.listen(PORT, () => {
    debug(`正在监听${PORT}端口`);
});
