// constantes 
const express = require('express');
const res = require('express/lib/response');
const path = require('path');
const modulo = express.Router();
const api = require('../modulos/controladores');


// Ruta get para inicio 
modulo.get('/', function (req, res) {
    res.send('Hello World!');
    //res.sendFile(path.resolve('src','home','index.html'));
    api.conectar()
});

// ruta get de prueba 
modulo.get('/admin',(req, res) =>{
    api.obtener_admin(req, res);
});

modulo.post('/opticos',(req, res) =>{
    api.guardarDatosOpticos(req,res);
});


modulo.post('/telemetria',(req, res) =>{
    api.guardarDatosTelemetriaRiegos(req,res)
});

module.exports = modulo;

