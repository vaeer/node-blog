/**
 * @file plugin文件，按照数组顺序加载
 * @author vaer
 */

const path = require('path');
const fs = require('fs');

// plugins文件夹下的所有插件,并去掉后缀名
const files = fs.readdirSync('./plugins')
    .filter(file => !file.includes('index'))
    .map(file => file.substring(0, file.indexOf(".")))

// 插件加载顺序
const plugins = [
    'x-response-time'
];

const pluginsLoad = app => {
    plugins.forEach((plugin, index) => {
        console.log(`正在加载第${++index}个插件：${plugin}`);
        try {
            // 如果是自定义中间件
            if (files.includes(plugin)) {                
                app.use(require(`./${plugin}`));
            } else {
            // 如果是公共中间件
                app.use(require(plugin));
            }
        } catch (e) {
            console.log(e);
        }
    });
};

module.exports = pluginsLoad;