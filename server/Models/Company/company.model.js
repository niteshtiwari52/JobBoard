const mongoose = require("mongoose");
const jwt = require("jsonwebtoken"); 

const CompanySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  owner: { type: String, required: true },
  companyName: { type: String, required: true },
  mobile : {
    type : String, 
    required : true,
  },
  employeeSize : {
    type: String,
    required : true,
  },
  emailOtp : {
    type : String, 
    
  },
  isEmailVerified : {
    type : Boolean,
    default : false,    
  },
  isMobileVerified : {
    type : Boolean,
    default : false
  }
});
// Attachments : Genrating a JWT Token
CompanySchema.methods.generateJwtToken = function () {
  return jwt.sign({ user: this._id.toString() }, process.env.JWT_SECRET);
};


const CompanyModel = mongoose.model("Company", CompanySchema);

module.exports =  CompanyModel ;
