require('../style/reset.less');
require('../style/app.less');

import angular from 'angular';
let ngModule = angular.module('app', []);

require('../directive/layout/layout')(ngModule);
let httpMethod = require('../app/db')(ngModule);


ngModule.controller('appCtrl', ['$scope', 'httpMethod', function($scope, httpMethod) {
    $scope.clickFn = function() {
        debugger
        // 查询员工信息
        httpMethod.querySupplierByCond().then(function(rsp) {
            $log.log('调用查询供货商信息接口成功.');
            $rootScope.querySupplierResultList = rsp.data.list;
            $scope.totalNum = rsp.data.totalNum;
        }, function() {
            $log.log('调用查询供货商信息接口失败.');
        });
    }
}])
