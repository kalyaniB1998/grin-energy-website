 const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
  name: String,
  contact: String,
  email: String,
  title:String,
  message: String,
  },
  {
     timestamps: true 
  }
  

);

module.exports = mongoose.model("Enquiry", enquirySchema);
