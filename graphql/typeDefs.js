const { gql } = require("apollo-server-express");
const { ORDER_TYPE } = require("../typeDefs/OrderTypeDefs");
const typeDefs = gql`
  ${ORDER_TYPE}
  type Query {
    hello: String
    user(first:Int,last:Int): UserData
    products(first:Int,last:Int,type:String): ProductData
    ProductById(_id: String!): Product
    DataForDashborad:DashboardData
  }
  type Mutation {
    CreateProduct(input: ProductInput): Product
    updateProduct(_id: String!, input: ProductInput): Product
    deleteProduct(_id: String!): Product
    DeleteUser(_id: String!) :delUSer
    createUser(input: userIn!): CreateUserResponse
    SignInUser(data: userSignIn!): SignInUserResponse
    ChangePassword(input: ChangePassword!): ChangePassResponse
  }

  type DashboardData {
    order: [Order]
    userData: [user],
    ProductData:[Product]
  }

  type Order {
    _id: String
    PaymentMode: String
    productsDetails: [OrderProduct]
    orderid: String
    address: [Address]
    totalAmount: Int
    month: String
    email: String
    name: String
    time: String
    active: Boolean
    process: Boolean
    delivered: Boolean
    canceled: Boolean
    canceledByUser: Boolean
    createdAt: String
  }

type delUSer {
  message:String
  status:Boolean
}
  type Error {
    message: String  
  }

  type UserData {
    Data: [user]
    length: Int
  }
  type ProductData {
    Data: [Product]
    length: Int
  }

  type CreateUserResponse {
    user: user
    error: Error
    message: String
  }

  type SignInUserResponse {
    User: user
    error: Error
    message: String
  }
  type ChangePassResponse {
    User: user
    error: Error
    message: String
  }

  scalar Date

  input userIn {
    name: String
    email: String
    acctype: String
    mobile: String
    password: String
    Active: Boolean
  }
  input userSignIn {
    email: String
    password: String
  }
  input ChangePassword {
    OldPassword: String
    NewPassword: String
    email: String
  }

  type user {
    _id: String
    name: String
    email: String
    acctype: String
    password: String
    mobile: String
    Active: Boolean
  }

  type Product {
    _id: String
    product_name: String
    price: String
    off:String
    shipping:String
    stock: String
    type: String
    description: String
    Quantity: [String]
    pricelist: [String]
    review: [String]
    image: [String]
  }

  input ProductInput {
    _id: String
    product_name: String
    price: String
    stock: String
    type: String
    off:String
    shipping:String
    description: String
    Quantity: [String]
    pricelist: [String]
    review: [String]
    image: [String]
   
  }
`;

module.exports = typeDefs;
