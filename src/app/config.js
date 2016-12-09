let CONFIG = {};

// 接口配置
CONFIG.API = {};

// 是否使用MOCK数据
CONFIG.API.USEMOCK = false;
CONFIG.API.SERVER_ADDRESS = 'https://sd.189.cn/flowSell/';
CONFIG.API.REQUEST_HEADER = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
};

/**
 * 版本格式: 主版本号.次版本号.修订号
 * 进行了重大的修改或者局部修改积累较多,导致整体发生全局变化,主版本号+1,次版本\修订号复位0;
 * 原基础上增加了部分功能,主版本号不变,子版本号+1,修订号复位0;
 * 局部修改或者BUG修正,主版本号\次版本号不变,修订号+1;
 */
CONFIG.SCHEMA_VERSION = "1.0.0";

module.exports = CONFIG;
