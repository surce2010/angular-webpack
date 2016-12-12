let ErrorMap = require('./index');

module.exports = function(error) {
    let { errorCode, errorMsg } = error;
    let msg = '';
    if (ErrorMap[errorCode]) {
        msg = '[' + errorCode + '] ' + ErrorMap[errorCode]
    } else {
        msg = '系统错误，请稍后再试！'
    }

    console.log(msg, errorMsg);
};
