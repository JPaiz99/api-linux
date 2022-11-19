const oracledb = require('oracledb');
const config ={
    user: 'hpaiz',
    password: 'hpaiz1',
    connectString: '10.13.12.206:1521/DESUNICO'
}

oracledb.initOracleClient({configDir: '/opt/oracle/instantclient'});
console.log("Oracle client library version number is " + oracledb.oracleClientVersion);
async function conectar(){
    try {
        conn = await oracledb.getConnection(config);
        console.log('conectado XD');
    } catch (error) {
        console.log('no conectado');
    }finally{
        if (conn) {
            try {
                await conn.close();
                console.log('conexion finalizada');
            } catch (error) {
                console.log(error.message);
            }    
        }
    }
}

async function obtener_admin(req, res){
    const query ="select * from SDEUSR.data_pluviometro_optico";
    const sql_rol = "set role all";
    try {
        conn = await oracledb.getConnection(config);
	conn.execute(sql_rol);
        resultado = await conn.execute(query);
        if (resultado.rows.length ==0) {
            return res.send('No se encontro data');
        } else {
            return res.json(resultado.rows)
        }
        
    } catch (error) {
        return res.send(error.message);
    }finally{
         if (conn) {
            try {
                await conn.close();
            } catch (error) {
                return res.send(error)
            }
         }
    }
}

async function insertar_data(req, res){
    try {
        
    } catch (error) {
        
    }

}

module.exports = {obtener_admin, insertar_data, conectar}
