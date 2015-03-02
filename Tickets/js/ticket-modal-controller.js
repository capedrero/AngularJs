angular.module('ticket.modal.controller', ['ticket.filter', 'ticket.factory', 'ui.grid.selection', 'ngRoute', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.pagination', 'ui.bootstrap'])

.controller('ModalInstanceCtrl', function($scope, $modalInstance, ShareData) {

    $scope.selected = ShareData.getSelectedRow();

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        ShareData.setSelectedRow({});
    };
});