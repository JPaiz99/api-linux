const mysql = require('mysql');


//cambiar Parametros de Conexion a la base de datos.
const mysqlConnection = mysql.createConnection({
    host: '10.155.200.62',
    user: 'hpaiz',
    password: '1234',
    database: 'imsa'
});

mysqlConnection.connect(function(err){
    if(err) {
        console.log(err);
        return;
    }else{
        console.log('Conexion exitosa :)');
    }
});

module.exports= mysqlConnection;