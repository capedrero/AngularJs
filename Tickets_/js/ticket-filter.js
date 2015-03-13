angular.module('ticket.filter', ['ui.grid.selection', 'ngRoute', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.pagination', 'ui.bootstrap'])

.filter('mapFilter', function() {

        var mapTypes = ['<div><i class=\"glyphicon glyphicon-camera\"></i></div>', '<div><i class=\"glyphicon glyphicon-home\"></i></div>'];

        return function (input) {
            if (!angular.isDefined(input) || input === false) {
                return 'falso';//mapTypes[0];
            }
            return 'true';//mapTypes[1];

        };
    });