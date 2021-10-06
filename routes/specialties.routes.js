//rutas o urls para que el Frontend acceda al server. Va a pedir, actualizar datos
// y otras operaciones mas
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
//con esta constante Task lo asocio al modelo de la base de datos
const Specialties = require("../models/Specialties");
const PastryChefs = require("../models/PastryChef");

//ruta asocida a /api/pastry
router.get("/", async (req, res) => {

 try {
    
    const result = await PastryChefs.aggregate([
      {
        $lookup:
        {
          from: "specialties",
          localField: "_id",
          foreignField: "chef",
          as: "resultado"

        }
      }
            
    ]);
    
    res.json(result);
  
  } catch (error) {
    res.json({ message: `Hubo un error : ${error}` });
    
  }     

});

//para obtener todo el registro del pastelero
router.get("/:id", async (req, res) => {
  
  try {
    
   const relacion = await PastryChefs.aggregate(
    [
      { $match: {_id: mongoose.Types.ObjectId(req.params.id) } },
      {                
        $lookup:
        {
          from: "specialties",
          localField: "_id",
          foreignField: "chef",
          as: "resultado"

        }
      }
      
      
    ]);
  
    res.json(relacion);
  } catch (error) {
    res.json({ message: `Hubo un error : ${error}` });
    
  }  
});

//para obtener busquedas por la descripcion de la especialidad
router.get("/find/:description", async (req, res) => {
/*   try {
     const relacion = await PastryChefs.aggregate(
     [
       { $match: {: mongoose.Types.ObjectId(req.params.id) } },
       {                
         $lookup:
         {
           from: "specialties",
           localField: "_id",
           foreignField: "chef",
           as: "resultado"
 
         }
       }
       
       
     ]);
     
     res.json(relacion);
   } catch (error) {
     res.json({ message: `Hubo un error : ${error}` });
     
   }
  */
 
 
  try {
    const task = await Specialties.find({ title: { $regex: req.params.title } });
    res.json(task);
  } catch (err) {
    res.json({ message: "Hubo un error" });
   
  }
});

//Guardamos una nueva especialidad
router.post("/", async (req, res) => {
  const { price, description, chef } = req.body;

  const specialtie = new Specialties({
    price,
    description,
    chef
  });

  try {
    await specialtie.save();
    res.json({ status: "Dato guardado satisfactoriamente" });
    
  } catch (err) {
    
    res.json({ message: `Hubo un error al registrar información: ${err}`  });
  }
});

//Actualizar la tarea y recibe por  la ruta  id.
router.put("/:id", async (req, res) => {
  const { title, description, responsible, priority } = req.body;
  const newTask = {
    title,
    description,
    responsible,
    priority,
  };
  try {
    await Specialties.findByIdAndUpdate(req.params.id, newTask);
    res.json({ status: "Tarea actualizada" });
    
  } catch (err) {
   
    res.json({ message: "Hubo un error al actualizar la información" });
  }
});

//Eliminar la tarea y recibe por  la ruta  id.
router.delete("/:id", async (req, res) => {
  try {
    await Specialties.findByIdAndRemove(req.params.id);
    res.json({ status: "Tarea Eliminada" });
    
  } catch (err) {
    
    res.json({ message: "Hubo un error al eliminar la información" });
  }
});

module.exports = router;