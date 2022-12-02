const oracledb = require('oracledb')

// configuracion de conexion a Base de Datos.
const PRODUCCION ={
    user: 'SDE_AP_TAREAS',
    password: 'Temporal1',
    connectString: '10.13.12.33:1521/IMSA'
}

const DESARROLLO ={
    user: 'SDE_AP_TAREAS',
    password: 'Temporal1',
    connectString: '10.13.12.206:1521/DESUNICO'
}
// -----------------------------------------------

//inicializador de cliente de oracle

//oracledb.initOracleClient({libDir: 'C:\\Users\\hpaiz\\Documents\\oracliente\\instantclient_21_6'});
oracledb.initOracleClient({configDir: '/opt/oracle/instantclient'});
//console.log("Oracle client library version number is " + oracledb.oracleClientVersion);

//---------------------------------------

//funcion de conexion prueba
async function conectar(){
    try {
        conn = await oracledb.getConnection(DESARROLLO);
        console.log('conectado');
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
// ----------------------------------

// Funcion get de prueba
async function obtener_admin(req, res){
    const sql_rol = "set role all"
    const query ="select * from SDEUSR.data_pluviometro_optico";
    try {
        conn = await oracledb.getConnection(DESARROLLO);
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
//----------------------------------------------

// funcion de Ruta que optiene datos en formato JSON de Thingsboard y los ingresa oracle
async function guardarDatosOpticos(req, res){
    const data = req.body;
    const sql_rol = "set role all";
    const query ="insert into SDEUSR.data_pluviometro_optico(dato_lluvia_milimetros) values("+req.body.lluvia+")";
    const comit ="COMMIT"
    try {
        //console.log(data);
        conn = await oracledb.getConnection(DESARROLLO);
        conn.execute(sql_rol);
        resultado = await conn.execute(query);
        /*if (resultado.rows.length ==0) {
            return res.send('No se encontro data');
        } else {
            return res.json(resultado.rows)
        }*/
        
    } catch (error) {
        return res.send(error.message);
    }finally{
         if (conn) {
            try {
                conn.execute(comit)
                await conn.close();
            } catch (error) {
                return res.send(error)
            }
         }
    }

}
//-------------------------------------------------------

// funcion que optiene 
async function guardarDatosTelemetriaRiegos(req, res){

    const DEV_EUI = req.body.dev_eui;
    const PORCENTAJE_DE_TANQUE_DIESEL = req.body.nivel_tanque;
    const REVOLUCIONES_POR_MINUTO = req.body.rpm;
    const CODIGO_DE_BOMBA_RIEGO = req.body.bomba
    const TIPO_DE_BOMBA_RIEGO = req.body.tipo_bomba;
    const ESTADO_ACTIVIDAD = req.body.estado;

    //console.log(DEV_EUI+" "+PORCENTAJE_DE_TANQUE_DIESEL+" "+REVOLUCIONES_POR_MINUTO+" "+CODIGO_DE_BOMBA_RIEGO+" "+TIPO_DE_BOMBA_RIEGO+" "+ESTADO_ACTIVIDAD)

    const sql_rol = "set role all";
    const query ="INSERT INTO SDEUSR.DATA_TELEMETRIA_DE_RIEGOS(DEV_EUI, PORCENTAJE_DE_TANQUE_DIESEL, REVOLUCIONES_POR_MINUTO, CODIGO_DE_BOMBA_RIEGO, TIPO_DE_BOMBA_RIEGO, ESTADO_ACTIVIDAD) values('"+DEV_EUI+"',"+PORCENTAJE_DE_TANQUE_DIESEL+","+REVOLUCIONES_POR_MINUTO+",'"+CODIGO_DE_BOMBA_RIEGO+"','"+TIPO_DE_BOMBA_RIEGO+"','"+ESTADO_ACTIVIDAD+"')";
    const comit = "COMMIT";
    try {
        //console.log(data);
        conn = await oracledb.getConnection(DESARROLLO);
        conn.execute(sql_rol);
        resultado = await conn.execute(query);    
    } catch (error) {
        return res.send(error.message);
    }finally{
         if (conn) {
            try {
                conn.execute(comit)
                await conn.close();
            } catch (error) {
                return res.send(error)
            }
         }
    }

}

async function guardarDatosGafeteGPS(req, res){

    const DEV_EUI = req.body.dev_eui;

    //console.log(DEV_EUI+" "+PORCENTAJE_DE_TANQUE_DIESEL+" "+REVOLUCIONES_POR_MINUTO+" "+CODIGO_DE_BOMBA_RIEGO+" "+TIPO_DE_BOMBA_RIEGO+" "+ESTADO_ACTIVIDAD)

    const sql_rol = "set role all";
    const query ="INSERT INTO SDEUSR.DATA_GAFETE_GPS_TRACKER(DEV_EUI,) values('"+DEV_EUI+"',)";
    const comit = "COMMIT";
    try {
        //console.log(data);
        conn = await oracledb.getConnection(DESARROLLO);
        conn.execute(sql_rol);
        resultado = await conn.execute(query);    
    } catch (error) {
        return res.send(error.message);
    }finally{
         if (conn) {
            try {
                conn.execute(comit)
                await conn.close();
            } catch (error) {
                return res.send(error)
            }
         }
    }

}

module.exports = {
    obtener_admin, 
    guardarDatosOpticos,  
    guardarDatosTelemetriaRiegos, 
    guardarDatosGafeteGPS
}
