const express = require("express");
const router = express.Router();

const { UUID } = process.env;
const jwt = require("jsonwebtoken");
const JsonWebTokenError = require("jsonwebtoken/lib/JsonWebTokenError");

const User = require("../models/PastryChef");

//ruta para registrar nuevo usuario
router.post("/signup", async (req, res) => {
 
const {nombres, email, phone, state, municipio, nick, password} = req.body;

  const user = new User({
    name:nombres,
    email,
    phone,
    state,
    municipio,
    nick,
    password
  })

 try{
  user.password = await user.encryptPass(user.password);
  await user.save();
    
  res.json({ auth: true});

}catch(err){
  res.json({ message: `Hubo un error en el registro: ${err}` });
  
 } 

});

//**************************************************************** */

//ruta para ingresar a la app
router.post("/signin", async (req, res) => {
  //verificar acceso
  const { nick, password } = req.body;
 
  try {
    const user = await User.findOne({ nick });

    if (!user) {
      
      return res.status(404).json({
        auth: false,
        message: "nick no encontrado",
      });
    }

    const ValidatePass = await user.validatePass(password);

    if (!ValidatePass) {
      
      return res.status(401).json({
        auth: false,
        message: "El password no coincide",
      });
    }

    const token = jwt.sign({ id: user._id }, UUID, { expiresIn: 60 });
    
   
    res.json({ auth: true, token });
    
  } catch (err) {
   
    res.json({ message: `Hubo un error: ${err}` });
  }
});

router.post("/verify", async (req, res) => {
  //verificar acceso
  const { nick, password } = req.body;
  console.log(req.body)
  try {
    const user = await User.findOne({ nick } );

    if (!user) {
      
      return res.status(404).json({
        auth: false,
        message: "usuario no encontrado",
      });
    }

    const ValidatePass = await user.validatePass(password);

    if (!ValidatePass) {
      
      return res.status(401).json({
        auth: false,
        message: "El password no coincide",
      });
    }

  
   
    res.json({ id: user._id });
    
  } catch (err) {
   
    res.json({ message: `Hubo un error: ${err}` });
  }
});

module.exports = router;