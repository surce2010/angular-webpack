require('../style/reset.less');
require('../style/app.less');

import angular from 'angular';
console.log("dll's React:", angular);

let ngModule = angular.module('app', []);

require('../directive/layout/layout')(ngModule);
