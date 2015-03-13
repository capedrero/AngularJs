angular.module('ticket.modal.controller',['angular.confirm'])// ['ticket.filter', 'ticket.factory', 'ui.grid.selection', 'ngRoute', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.pagination', 'ui.bootstrap'])


    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, ShareData, TIPOS, $confirm) {

        $scope.isAlta = function () {
            return angular.equals($scope.type, TIPOS.ALTA);
        }
        $scope.isEdicion = function () {
            return angular.equals($scope.type, TIPOS.EDICION);
        }
        $scope.isBaja = function () {
            return angular.equals($scope.type, TIPOS.BAJA);
        }

        $scope.type = ShareData.getType();

        if($scope.isEdicion() || !angular.isDefined($scope.selected)) {

            $scope.selected =   angular.copy(ShareData.getSelectedRow());
        };

        $scope.alta = function () {
            if($scope.isAlta()){
                $confirm({text: '\u00BFDesea proceder a dar de alta el registro?'})
                    .then(function() {
                        $scope.selected.date=new Date();
                        $modalInstance.close($scope.selected);
                    });

            }
        };
        $scope.update = function () {
            if($scope.isEdicion()){
                $confirm({text: '\u00BFDesea proceder a Actualizar el registro?'})
                    .then(function() {
                        $scope.selected.date=new Date();
                        $modalInstance.close($scope.selected);
                    });

            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.asViewed = function(){
            $scope.selected.viewed = false;
            $modalInstance.close($scope.selected);
        }


        $scope.isInvalid = function(field){
            //También valdría
            return $scope.formItem[field].$invalid && $scope.formItem[field].$dirty;
        };
        $scope.isInvalidField = function(field, error){
            //También valdría
            return $scope.formItem[field].$error[error];
        };

        $scope.isValid = function(field){
            return $scope.formItem[field].$valid && $scope.formItem[field].$dirty;
        };



    });