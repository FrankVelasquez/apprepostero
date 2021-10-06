const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const PastrySchema =new Schema({
    name: { type: String, maxlength:100},
    email:  { type: String, maxlength:200},
    phone: { type: String, maxlength:200},
    state: { type: String, maxlength:100},
    municipio:{ type: String, maxlength:200},
    nick: { type: String, maxlength:500},         
    password : { type: String, maxlength:500},        
    places: { type: Array, default: [] }      

});

PastrySchema.methods.encryptPass= async(password)=>{

    const salt= await bcrypt.genSalt(10);
    const hash= await bcrypt.hash(password, salt) 
    return (hash)


};

PastrySchema.methods.validatePass= function (password) {
    
   return bcrypt.compare(password, this.password) 
    

};

const PastryChef =mongoose.model('PastryChef', PastrySchema); 
module.exports= PastryChef;