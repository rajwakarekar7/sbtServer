const mongoose = require("mongoose");

// Define the schema
const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
  },
  price: {
    type: String,
  },
  form: {
    type: String,
  },
  stock: {
    type: Number,
  },
  type: {
    type: String,
  },
  shipping: String,
  off: String,
  description: {
    type: String,
  },

  // praman: {
  //   type: String,
  // },

  main_ingredient: {
    type: [String],
  },
  Quantity: {
    type: [String],
  },
  pricelist: {
    type: [String],
  },
  // Advantages: {
  //   type: [String],
  // },
  review: {
    type: [String],
  },
  image: {
    type: [String],
  },
});

// Create the model
const ProductModel = mongoose.model("ProductData", productSchema);

module.exports = ProductModel;
