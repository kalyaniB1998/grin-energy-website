const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: String,
  imageURL: String,
   description: String,
  price: Number,
  // rating: Number,
  // rating: {
  //   type: Number,
  //   default: 0, // default rating if not yet rated
  // },

ratings: [
  {
    userId: String,
    rating: Number,
  }
],
averageRating: {
  type: Number,
  default: 0,
},

   gst: {
    type: Number,
    required: true,
    default: 0,
  },
customFields: {
    type: Map,
    of: String
  }  
});

module.exports = mongoose.model("products", ProductSchema);
