require('../../style/reset.less');
require('../../style/app.less');

import 'babel-polyfill';
import angular from 'angular';

let ngModule = angular.module('demo', []);

require('../../directive/layout/layout')(ngModule);
