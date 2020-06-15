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
    status: params || 500,
    message: params.message || '',
    stack: params.stack || null,
    data: params.data || null
});

module.exports = {
    handleSuccess,
    handleError
};