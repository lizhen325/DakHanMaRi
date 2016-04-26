/// <reference path="../Venders/angular.js" />
(function () {
    'use restrict';
    angular.module('DakHanMaRi')
            .filter('formatDateTime', function ($filter) {
                return function (date) {
                    return $filter('date')(parseInt(date.substr(6)), 'yyyy-MM-dd');
                }
            })
})();