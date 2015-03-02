angular.module('app', ['ticket.modal.controller', 'ticket.filter', 'ticket.factory', 'ui.grid.selection', 'ngRoute', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.pagination', 'ui.bootstrap'])

.config(function($routeProvider){
  $routeProvider.when("/",
    {
      templateUrl: "app.html",
      controller: "ctrl"
    }
  );

})



.controller('TicketController', function($scope, $log, $modal, ftickets, ShareData) {

  $scope.tickets = ftickets;
  $scope. showIcon = function(input){

      const mapTypes = ['glyphicon glyphicon-folder-close', 'glyphicon glyphicon-folder-open'];

        if (!angular.isDefined || input === false) {
          return mapTypes[0];
        }
        return mapTypes[1];
      };

  var statusTemplate = '<div class=\"container\"><i class=\"{{grid.appScope.showIcon(row.entity.viewed)}}\"</i></div>';
  $scope.gridOptions = {
    minRowsToShow:7,
    enablePaginationControls:true,
    paginationPageSizes: [5, 15, 30],
    paginationPageSize: 5,
    multiSelect:false,
    enableRowSelection: true,
    enableSelectAll: false,
    enableFiltering: false,
    enableColumnResize : true,
    showGridFooter:true,
    noTabInterference: true,
    enableColumnResizing: true,
    enableCellSelection: false,
    enableHorizontalScrollbar:true,
    data: 'tickets',
    enableColumnMenus:true,
    enableGridMenu: true,
    showGridFooter:false,
    //glyphicons glyphicons-message-flag
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
        cellFilter:  "date: 'yyyy-MM-dd HH:mm'",
        type: 'date'
      }
    ]
  };


  $scope.gridOptions.onRegisterApi = function (gridApi) {
    $scope.gridApi = gridApi;
    $scope.gridApi.selection.on.rowSelectionChanged($scope,function (row) {
      if (row.isSelected) {
        ShareData.setSelectedRow(row.entity);

      }

    });
  }

  $scope.open = function (size) {

  if(angular.equals({}, ShareData.getSelectedRow())){
    return;
  }
    var modalInstance = $modal.open({
      templateUrl: 'templates/modal-ticket.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        item: function () {
          ShareData.getSelectedRow().viewed = true;
          return ShareData.getSelectedRow();
        }
      }
    });
      modalInstance.result.then(function (selectedItem) {
      //Aqui habria que marcar como no viewed
       // $scope.selected = ShareData.getSelectedRow();
        ShareData.getSelectedRow().viewed=false;
    }, function () {
      //Si ha pulsado cancelar
      $log.log('Modal dismissed at: ' + new Date());
    });
  };
});
