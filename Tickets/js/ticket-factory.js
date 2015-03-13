angular.module('ticket.factory', [])
.factory('ftickets', function () {
    return [
        {id:0,date:new Date(1416396274368),viewed:true, name: 'CarlosA', mail: 'a@a.es', subject: 'Tipos de Combustible', msg: 'Falta el conductor de fluflo copon!'},
        {id:1,date:new Date(1416396274368),viewed:false,name: 'CarlosB', mail: 'a@a.es', subject: 'Tipos de Combustible again', msg: '¿Nadie contesta?'},
        {id:2,
            date:new Date(1416396274368),viewed:false,
            name: 'CarlosC',
            mail: 'a@a.es',
            subject: 'Otra vez el mismo pesao',
            msg: 'Lo importante es querese a uno mucho quererse a uno siempre'
        },
        {id:3,date:new Date(1416396274368),viewed:false,name: 'CarlosD', mail: 'a@a.es', subject: 'No tengo otra cosa que hacer', msg: 'AAAAAAAAHHHH'},
        {id:4,date:new Date(1416396274368),viewed:false,name: 'CarlosE', mail: 'a@a.es', subject: 'En fins', msg: 'La virgen de la macarena'},
        {id:5,date:new Date(1416396274368),viewed:false,name: 'CarlosE', mail: 'a@a.es', subject: 'En fins', msg: 'La virgen de la macarena'},
        {id:6,date:new Date(1416396274368),viewed:false,name: 'CarlosE', mail: 'a@a.es', subject: 'En fins', msg: 'La virgen de la macarena'},

    ];
})

.factory('ShareData', function () {

    var data = undefined;
    var type = undefined;

    return {
        getSelectedRow: function () {
            return data;
        },
        setSelectedRow: function (selectedRow) {
            data = selectedRow;
        },
        clearSelectedRow: function () {
            data = undefined;
        },
        setType:function(typeArg){
            type = typeArg;
        },
        getType: function () {
            return type;
        },
        clearType: function () {
            type = undefined;
        }
    };
})
.constant("TIPOS", {"ALTA": "ALTA", "EDICION": "EDICION", "BAJA": "BAJA"})
.constant("MAP_ICONS", ['glyphicon glyphicon-folder-close', 'glyphicon glyphicon-folder-open'])