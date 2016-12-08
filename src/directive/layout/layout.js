require('./layout.less');

module.exports = function(ngModule) {
    ngModule.directive('layout', accordionFn);

    function accordionFn() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            template: require('./layout.html'),
            controller: function() {
                /*var expanders = [];

                this.gotOpened = function(selectedExpander) {
                    angular.forEach(expanders, function(expander) {
                        if(selectedExpander != expander) {
                            expander.showMe = false;
                        }
                    })
                }

                this.addExpander = function(expander) {
                    expanders.push(expander);
                }*/
            }
        }
    }
}
