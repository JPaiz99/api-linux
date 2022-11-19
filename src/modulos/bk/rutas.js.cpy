const express = require('express');
const res = require('express/lib/response');
const path = require('path');
const modulo = express.Router();

//const mysqlConnection = require('../conexion')
const data_lluvia = require('../modulos/controladores');

modulo.get('/', function (req, res) {
   // res.send('Hello World!')
    //res.sendFile(path.resolve('src','home','index.html'));
    data_lluvia.conectar();
});

modulo.get('/admin',(req, res) =>{
    data_lluvia.obtener_admin(req, res)
});

modulo.post('/opticos',(req, res) =>{

});

module.exports = modulo;

