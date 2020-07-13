/**
 * @file 自定义plugin文件，按照数组顺序加载
 * @author vaer
 */

const fs = require('fs');
const debug = require('debug')('middleware');

// middlewares文件夹下的所有插件,并去掉后缀名
const files = fs.readdirSync('./middlewares')
    .filter(file => !file.includes('index'))
    .map(file => file.substring(0, file.indexOf(".")))

// 插件加载顺序
const middlewares = [
    'debug',
    'history-api-fallback',
    '404',
    'x-response-time'
];

const loadMiddlewares = app => {
    middlewares.forEach((plugin, index) => {
        debug(`正在加载第${++index}个插件：${plugin}`);
        try {
            // 如果是自定义中间件
            if (files.includes(plugin)) {                
                app.use(require(`./${plugin}`));
            } else {
            // 如果是公共中间件
                app.use(require(plugin));
            }
        } catch (e) {
            debug(e);
        }
    });
};

module.exports = loadMiddlewares;