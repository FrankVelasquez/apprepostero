//para el uso de express nodejs para crear e inicializar el server
const express = require("express");
const app = express();
//Gestiona el server
const morgan = require("morgan");
//permitir el acceso a las rutas 
const cors = require("cors");
//Helmet para configurar las cabeceras
const helmet = require("helmet");
//se usa jsonwebtoken para generar al usuario un token de acceso al sistema
const jwt = require("jsonwebtoken");
 //para resolver el problema del path entre linux y windows
const path = require("path");

//variables de entorno usadas del archibo .env
require('dotenv').config();
const { HOST, PORT } = process.env;

//configuraciones cabeceras y cors
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
      },
    },
  })
);

app.use(cors());

//middelwares de express
app.use(morgan('tiny'));

//para entender la data en formato json
app.use(express.json()); 


//rutas
app.use("/api/pastry", cors(), require("./routes/specialties.routes"));
app.use("/auth", cors(), require("./routes/auth"));

//archivos estaticos
app.use(express.static(path.join(__dirname, "../Frontend/public")));

//iniciando el server
app.listen(PORT, HOST, () => {
 
  //****condicionar que no halla error de conexion*****
 
  console.log(`server active in http://${HOST}:${PORT}`);
  //base de datos 
  const { mongoose } = require("./database"); //con esta instruccion conectamos a la base de datos
  

});