/**
 * @file 应用入口文件
 * @author vaer
 */

const Koa = require('koa');
const koaStatic = require('koa-static');
const path = require('path');
const loadPlugins = require('./plugins');

const PORT = process.env.PORT || 4000;

const app = new Koa();
const router = require('./routes');

app.use(koaStatic(path.join(__dirname, './public')));

// 加载中间件
loadPlugins(app);

app.use(router.routes(), router.allowedMethods());

app.listen(PORT, () => {
    console.log(`正在监听${PORT}端口`);
});
