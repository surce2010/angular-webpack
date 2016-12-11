require('./layout.less');

module.exports = function(ngModule) {
    ngModule.directive('layout', accordionFn);

    function accordionFn() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            template: require('./layout.html')
        };
    }
};
