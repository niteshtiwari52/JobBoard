const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  
  title : {
    type : String ,
    required : true,
  }, 
  description : {
    type : String ,
    required  : true,
  },
  expereince : {
    type : Number, 
    required : true
  },
  candidates: [{  
    type: String,  
    required: true,
  }],
  endDate : {
    type : String , 
    required : true
  }
} , {
    timestamps : true
});

const JobModel = mongoose.model("Job", JobSchema);

module.exports = JobModel ;
