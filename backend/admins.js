const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  adminName: String,
   email: String,
  password: String,
});

module.exports = mongoose.model("admins", AdminSchema);