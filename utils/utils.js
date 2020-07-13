/**
 * @file 通用响应
 * @author vaer
 */

const handleSuccess = params => ({
    status: 0,
    message: params.message || '',
    data: params.data
});

const handleError = params => ({
    status: params.status || 500,
    message: params.message || '',
    stack: params.stack || null,
    data: params.data || null
});

// 正则字符转义
const escapeRegex = (text = '') => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// 去富文本
const removeHtml = text => {
    text = text.replace(/<\/?[^>]*>/g,'') // 去标签
        .replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    text = escape2Html(text); // 转义
    return `<p>${text}</p>`;
};


//转意符换成普通字符
const escape2Html = str => { 
    const arrEntities = {
        lt: '<',
        gt: '>',
        nbsp: ' ',
        amp: '&',
        quot: '"'
    }; 
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, (all, t) => arrEntities[t]); 
};

module.exports = {
    handleSuccess,
    handleError,
    escapeRegex,
    removeHtml
};