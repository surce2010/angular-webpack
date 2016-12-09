require('../../style/reset.less');
require('../../style/app.less');

let ngModule = angular.module('demo', []);

require('../../directive/layout/layout')(ngModule);
