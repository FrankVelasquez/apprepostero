const mongoose = require("mongoose");
const { Schema } = mongoose;



const SpecialtiesSchema = new Schema({
  
  description: { type: String, trim: true, require: true, maxlength: 2000 },
  price: { type: Number, trim: true, require: true },
  chef: { type: Schema.Types.ObjectId, ref: 'chefs'}
});

const Specialties =mongoose.model('Specialties', SpecialtiesSchema);
module.exports = Specialties;