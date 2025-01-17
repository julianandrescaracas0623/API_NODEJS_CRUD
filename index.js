

const express = require("express");
const app = express();

//nos ayuda a analizar el cuerpo de la solicitud POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cargamos el archivo de rutas
app.use(require('./routes/carta'));

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor corriendo en el puerto 3300");
});

module.exports = app;