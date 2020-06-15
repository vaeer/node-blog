/**
 * @file 应用入口文件
 * @author vaer
 */

const Koa = require('koa');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const loadMiddlewares = require('./middlewares');
const db = require('./database');

const PORT = process.env.PORT || 4000;

const app = new Koa();
const router = require('./routes');

app.use(koaStatic(path.join(__dirname, './public')));
app.use(bodyParser());

// 加载中间件
loadMiddlewares(app);

app.use(router.routes(), router.allowedMethods());

app.listen(PORT, () => {
    console.log(`正在监听${PORT}端口`);
});
