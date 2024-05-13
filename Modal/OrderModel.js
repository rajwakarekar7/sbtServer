const mongoose = require("mongoose");

const Month = new Date().getMonth() + 1
const Year = new Date().getFullYear()
// Define the Product schema
const productSchema = new mongoose.Schema({
  product: String,
  id: String,
  price: String,
  image: String,
  qnt: String,
  selWght: String,
  selPrice: String,
  stock: String,
});

// Define the Address schema
const addressSchema = new mongoose.Schema({
  state: String,
  city: String,
  pincode: String,
  referenceMobileNumber: String,
  deliveryAddress: String,
});

// Define the Order schema
const orderSchema = new mongoose.Schema({
  PaymentMode: String,
  productsDetails: [productSchema],
  orderid: String,
  address: [addressSchema],
  email: String,
  name: String,
  time: String,
  totalAmount: String,
  month: {
    type: String,
    default: Month,
  },
  year: {
    type: String,
    default: Year,
  },
  active: Boolean,
  process: Boolean,
  delivered: Boolean,
  canceled: Boolean,
  canceledByUser: Boolean,
  createdAt: String,
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = {
  OrderModel,
};
