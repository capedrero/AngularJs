angular.module('ticket.factory', [])
.factory('ftickets', function () {
    return [
        {date:new Date(1416396274368),viewed:true, name: 'CarlosA', mail: 'a@a.es', subject: 'Tipos de Combustible', msg: 'Falta el conductor de fluflo copon!'},
        {date:new Date(1416396274368),viewed:false,name: 'CarlosB', mail: 'a@a.es', subject: 'Tipos de Combustible again', msg: '¿Nadie contesta?'},
        {
            date:new Date(1416396274368),viewed:false,
            name: 'CarlosC',
            mail: 'a@a.es',
            subject: 'Otra vez el mismo pesao',
            msg: 'Lo importante es querese a uno mucho quererse a uno siempre'
        },
        {date:new Date(1416396274368),viewed:false,name: 'CarlosD', mail: 'a@a.es', subject: 'No tengo otra cosa que hacer', msg: 'AAAAAAAAHHHH'},
        {date:new Date(1416396274368),viewed:false,name: 'CarlosE', mail: 'a@a.es', subject: 'En fins', msg: 'La virgen de la macarena'},
        {date:new Date(1416396274368),viewed:false,name: 'CarlosE', mail: 'a@a.es', subject: 'En fins', msg: 'La virgen de la macarena'},
        {date:new Date(1416396274368),viewed:false,name: 'CarlosE', mail: 'a@a.es', subject: 'En fins', msg: 'La virgen de la macarena'},

    ];
})

.factory('ShareData', function () {

    var data = {};

    return {
        getSelectedRow: function () {
            return data;
        },
        setSelectedRow: function (selectedRow) {
            data = selectedRow;
        }
    };
});