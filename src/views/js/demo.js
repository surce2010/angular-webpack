require('../../style/reset.less');
require('../../style/app.less');

let ngModule = angular.module('app', []);

require('../../directive/layout/layout')(ngModule);
