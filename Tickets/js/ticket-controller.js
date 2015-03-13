angular.module('app', ['ticket.modal.controller', 'ticket.filter', 'ticket.factory', 'ui.grid.selection', 'ngRoute', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.pagination', 'ui.bootstrap'])

.config(function($routeProvider){
  $routeProvider.when("/",
    {
      templateUrl: "index.html",
      controller: "TicketController"
    }
  );

})

.controller('TicketController', function($http, $scope, $log, $modal, ftickets, ShareData, MAP_ICONS, TIPOS) {

  $http.get('/Tickets/json/data.json').
      success(function(data, status, headers, config) {

        $scope.tickets = data;
      }).error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
   //   $http(req).success(function(){...}).error(function(){...});
  $scope. showIcon = function(input){

      //const mapTypes = ['glyphicon glyphicon-folder-close', 'glyphicon glyphicon-folder-open'];

        if (!angular.isDefined(input) || input === false) {
          return MAP_ICONS[0];
        }
        return MAP_ICONS[1];
      };

  var statusTemplate = '<div class=\"container\"><i class=\"{{grid.appScope.showIcon(row.entity.viewed)}}\"</i></div>';
  $scope.gridOptions = {
    minRowsToShow:5,
    enablePaginationControls:false,
    paginationPageSize: 4,
    multiSelect:true,
    enableSelectAll: false,
    enableFiltering: false,
    enableColumnResize : true,
    showGridFooter:false,
    noTabInterference: true,
    enableColumnResizing: true,
    enableHorizontalScrollbar:true,
    data: 'tickets',
    enableColumnMenus:true,
    enableGridMenu: true,
    multiSelect : false,
    modifierKeysToMultiSelect : false,
    noUnselect : true,
    enableRowSelection: true,
    enableRowHeaderSelection: false,
    columnDefs: [{
      enableColumnMenu:false,
      name: 'viewed',
      displayName: '',
      //cellFilter:'mapFilter',
      maxWidth:3,
      cellTemplate: statusTemplate
    },
      { name: 'name',
        displayName: 'Nombre'
      },
      {
      name: 'subject',
      displayName: 'Asunto'
    }, {
      name: 'mail',
      displayName: 'E-Mail'
    }, {
        name: 'date',
        displayName: 'Fecha',
        cellFilter:  "date: 'yyyy-MM-dd HH:mm'"
      }
    ]
  };


  $scope.gridOptions.onRegisterApi = function (gridApi) {
    $scope.gridApi = gridApi;
    $scope.gridApi.selection.on.rowSelectionChanged($scope,function (row) {
      ShareData.setSelectedRow(row.isSelected?row.entity:undefined);
    });

  }
      /**
       * Elimina el elemento seleccionado.
       */
  $scope.removeTicket = function(){

    if(!angular.isDefined(ShareData.getSelectedRow())){
      return;
    }

      var index = $scope.tickets.indexOf(ShareData.getSelectedRow());
      $scope.tickets.splice(index, 1);
    $scope.gridApi.selection.clearSelectedRows();
    ShareData.clearSelectedRow();
    ShareData.clearType();
  };
      /**
       * Consultar un ticket
       */
$scope.readTicket = function () {
        if(!angular.isDefined(ShareData.getSelectedRow())){
          return;
        }

        var modalInstance = $modal.open({
          templateUrl: 'templates/modal-ticket-read.html',
          controller: 'ModalInstanceCtrl',
          size: 'lg',
          resolve: {
            item: function () {
              //Al abrir el modal, se le añade lo que queremos pasar
              ShareData.getSelectedRow().viewed = true;
              return ShareData;
            }
          }
        });
        modalInstance.result.then(function (selectedItem) {
          //Aqui habria que marcar como no viewed
          ShareData.getSelectedRow().viewed=false;

          $scope.gridApi.selection.clearSelectedRows();
          ShareData.clearSelectedRow();
          ShareData.clearType();

        }, function () {
          $scope.gridApi.selection.clearSelectedRows();
          ShareData.clearSelectedRow();
          ShareData.clearType();
        });
      }
  /**
   * Abre para actualizar el panel modal.
    * @param size
   */
  $scope.readTicketToUpdate = function () {

    if(!angular.isDefined(ShareData.getSelectedRow())){
    return;
  }

    var modalInstance = $modal.open({
      templateUrl: 'templates/modal-ticket.html',
      controller: 'ModalInstanceCtrl',
      size: 'lg',
      resolve: {
        item: function () {
          //Al abrir el modal, se le añade lo que queremos pasar
          ShareData.getSelectedRow().viewed = true;
          ShareData.setType(TIPOS.EDICION);
          return ShareData;
        }
      }
    });
      modalInstance.result.then(function (selectedItem) {
        var index = $scope.tickets.indexOf(ShareData.getSelectedRow());
        $scope.tickets.splice(index, 1, selectedItem);

        $scope.gridApi.selection.clearSelectedRows();
        ShareData.clearSelectedRow();
        ShareData.clearType();

    }, function () {
        $scope.gridApi.selection.clearSelectedRows();
        ShareData.clearSelectedRow();
        ShareData.clearType();
    });
  };
      /**
       * Añadir un nuevo ticket
       */
$scope.addTicket = function () {
        var modalInstance = $modal.open({
          templateUrl: 'templates/modal-ticket.html',
          controller: 'ModalInstanceCtrl',
          size: 'lg',
          resolve: {
            item: function () {
              //Al abrir el modal, se le añade lo que queremos pasar
              ShareData.clearSelectedRow();
              ShareData.setType(TIPOS.ALTA);
              return ShareData;
            }
          }
        });
        modalInstance.result.then(function (selectedItem) {
          $scope.tickets.push(selectedItem);

          $scope.gridApi.selection.clearSelectedRows();
          ShareData.clearSelectedRow();
          ShareData.clearType();
        }, function () {
          $scope.gridApi.selection.clearSelectedRows();
          ShareData.clearSelectedRow();
          ShareData.clearType();
        });
      };
});
