const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  price: Number,
  products: Array,
  email: String,
  address: Object,
   status: { type: String, default: "Pending" },
},  { timestamps: true } );

module.exports = mongoose.model("orders", OrderSchema);
