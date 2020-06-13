/**
 * @file 通用响应
 * @author vaer
 */

const errorCodes = {

}

const handleSuccess = result => ({
    status: 0,
    message: '',
    data: result
});

const handleError = err => ({
    status: errorCode,
    message: errorCodes[err],
    data: null
});

module.exports = {
    handleSuccess,
    handleError
};