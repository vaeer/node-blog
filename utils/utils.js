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

module.exports = {
    handleSuccess,
    handleError,
    escapeRegex
};