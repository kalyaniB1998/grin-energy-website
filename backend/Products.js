const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: String,
  imageURL: String,
   description: String,
  price: Number,
    
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
   gstAmount: {
    type: Number,
    default: 0
  },

  totalPrice: {
    type: Number,
    default: 0
  },

customFields: {
   type: mongoose.Schema.Types.Mixed,
     type: Map,
    of: String,
   
  }  
});

module.exports = mongoose.model("products", ProductSchema);
