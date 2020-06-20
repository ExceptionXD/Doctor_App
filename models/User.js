const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date(),
  },

  activationCode :{
    type: Number ,
  },
  accountActive :{
    type : Boolean ,
    default :false,
  },

  appointmentCode :{
    type: Number,
    default : 0 ,
  }
  
});

module.exports = mongoose.model('users',userSchema);