const mongoose = require('mongoose');
require('dotenv').config();
const {HOST, DB, URI } = process.env;

const uri2 = `mongodb://${HOST}/${DB}`;
const varMongoose = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

//Tomar en cuenta si las variables de entorno estan undefined

 mongoose.connect(URI, varMongoose)
  .then(db => {
    console.log(`Conectado exitosamente a ${URI} `)
    
  })
  .catch(err => {
    console.error(`Hubo un error al tratar de conectarse a la base de datos: ${err}`)
    
  });

 
module.exports = mongoose;