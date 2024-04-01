
const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

//conexion a la base de datos
const{connection} = require('../config.db');


const getCartaById = (req,res) =>
{
    const id = req.params.id;
    connection.query("SELECT * FROM carta WHERE id = ?",
    [id],
    (error, resultado) => {
        if(error)
            throw error;
        res.status(200).json(resultado);
    });
};

const getCarta = (req,res) =>
{
    connection.query("SELECT * FROM carta",(error, resultados) =>{
        if(error)
            throw error;
        res.status(200).json(resultados);
    });
};

const postCarta =(req,res) => 
{
    const {plato,descripcion,precio,estado} = req.body;
    connection.query("INSERT INTO carta (plato, descripcion, precio, estado) VALUES (?,?,?,?)",
    [plato,descripcion,precio,estado],
    (error, resultado) => {
        if(error)
            throw error;
        res.status(201).json({"Item añadido correctamente": resultado.affectedRows});
    });
};

const updateCarta = (req,res) =>
{
    const id = req.params.id;
    const {plato,descripcion,precio,estado} = req.body;
    connection.query("UPDATE carta SET plato = ?, descripcion = ?, precio = ?, estado = ? WHERE id = ?",
    [plato,descripcion,precio,estado,id],
    (error, resultado) => {
        if(error)
            throw error;
        res.status(201).json({"Item actualizado correctamente": resultado.affectedRows});
    });
};

const delcarta = (req,res) =>
{
    const id = req.params.id;
    connection.query("DELETE FROM carta WHERE id = ?",
    [id],
    (error, resultado) => {
        if(error)
            throw error;
        res.status(201).json({"Item eliminado correctamente": resultado.affectedRows});
    });
};
//rutas
app.route('/carta')
.get(getCarta)
.post(postCarta);

app.route('/carta/:id')
.get(getCartaById)
.put(updateCarta)
.delete(delcarta);


module.exports = app;