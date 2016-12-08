require('../style/reset.less');
require('../style/app.less');

import 'babel-polyfill';
import angular from 'angular';

let ngModule = angular.module('app', []);

require('../directive/layout/layout')(ngModule);
