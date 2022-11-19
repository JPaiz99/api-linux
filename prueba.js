var oracledb = require('oracledb');
var config = {
     usuario: 'hpaiz', // nombre de usuario
     contraseña: 'hpaiz1', // contraseña
     // IP: dirección IP de la base de datos, PORT: puerto de la base de datos, SCHEMA: nombre de la base de datos
  connectString : "10.13.12.206:1521/DESUNICO"
};
oracledb.getConnection(
  config,
  function(err, connection)
  {
    if (err) {
      console.error(err.message);
      return;
    }
 // Consulta diez pruebas de datos de una tabla, presta atención a reemplazar el nombre de tu tabla
         connection.execute ("select * from SDEUSR.data_pluviometro_optico",
      function(err, result)
      {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
                 // Imprime la estructura de la tabla devuelta
        console.log(result.metaData);
                 // Imprime los datos de la fila devuelta
        console.log(result.rows);
      });
  });
 
function doRelease(connection)
{
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
}
