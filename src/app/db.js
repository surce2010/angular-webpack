import CONFIG from './config';
import Mock from 'mockjs';

module.exports = function(ngModule) {
    ngModule.factory('httpMethod', ['$http', '$q', function($http, $q) {
        let httpMethod = {};
        // 查询权限类型信息
        httpMethod.querySupplierByCond = function(param) {
            let defer = $q.defer();
            $http({
                url: CONFIG.API.SERVER_ADDRESS + 'flow-backend/cust/queryCurrencyRule',
                method: 'POST',
                headers: CONFIG.API.REQUEST_HEADER,
                data: 'param=' + JSON.stringify(param)
            }).then(function(data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }, function(data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        if (CONFIG.API.USEMOCK) {
            Mock.mock(CONFIG.API.SERVER_ADDRESS + 'flow-backend/cust/queryCurrencyRule', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|2': [{
                    'operatorId|+1': ['1', '2'], //运营商ID
                    'name|+1': ['通讯运营商', '油运营商'], //运营商名称
                }],
                'errors': null
            });
        }

        return httpMethod;
    }])
}
