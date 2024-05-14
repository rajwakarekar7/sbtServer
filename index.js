const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Razorpay = require("razorpay")
dotenv.config({ path: "./.env" });
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://master.d2v70bn2gbv0ix.amplifyapp.com",
      "http://localhost:3000",
      "https://main.d7rexy5we1u9t.amplifyapp.com"
    ], // Change this to your frontend's URL
    optionsSuccessStatus: 200,
  })
);

const razorpay = new Razorpay({
  key_id: "rzp_test_AwYjl9iEgMP9Zk",
  key_secret: "ZU6SUT3OJbRroetooMuIT6TC"
})
// rzp_test_AwYjl9iEgMP9Zk
// ZU6SUT3OJbRroetooMuIT6TC

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const apolloServerStarter = async () => {
  try {
    const Server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    await Server.start();
    Server.applyMiddleware({ app: app, path: "/graph" });
    await mongoose.connect(`${process.env.MONGODB_URL}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("database Connected....");
    app.post("/crorder", async (req, res) => {
      try {
        const { amount } = req.body;
        const currentDate = new Date();

        const Order = await razorpay.orders.create({
          amount: Number(amount * 100),
          currency: "INR",
          receipt: `${currentDate.getSeconds()}`

        });
        res.status(200).json({
          success: true,
          order_id: Order.id,
          amount: Number(amount * 100),
        });
      } catch (error) {
        // console.error("Error creating order:", error);
        res.status(500).json({
          success: false,
          error: "Error creating order"
        });
      }
    });

    app.get("/", (req, res) => {
      res.send("we are live!");
    });



    app.listen(8000, () => console.log("server is running on port 8000 !"));
  } catch (error) {
    // console.log(error);
  }
};

apolloServerStarter();
