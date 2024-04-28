const { OrderModel } = require("../Modal/OrderModel");

const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const nodemailer = require("nodemailer");

const CreateOrder = async (_, { orderInput }) => {
  try {
    const { email, orderid } = orderInput;
    if (email) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_NODEMAILER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_NODEMAILER,
        to: email,
        subject: "Order Sucessfully",
        text: `Congratulations on your successful order at SPORTO.in! OrderId : ${orderid} We're thrilled to have you as our valued customer. Your support means the world to us, and we hope you enjoy the products and services you've chosen. If you have any questions or need assistance, please don't hesitate to reach out to our friendly customer support team. Thank you for choosing SoilBooster.in for your gardening needs!`,
      };

      await transporter.sendMail(mailOptions);
    }
    console.log(orderInput);
    await OrderModel.create(orderInput);
    return {
      message: "Order Confirm Sucessfully !",
      status: true,
    };
  } catch (error) {
    return {
      message: error?.message,
      status: false,
    };
  }
};

const GetOrderByEmail = async (_, { id }) => {
  try {
    const OrderByEmail = await OrderModel.find({ email: id });
    return OrderByEmail;
  } catch (error) {
    // console.log(error);
    return [{}];
  }
};

const DeleteOrder = async (_, { _id }) => {
  try {
    await OrderModel.findOneAndDelete({ _id: _id });
    return {
      message: "Order Deleted Sucessfully !",
      status: true,
    };
  } catch (error) {
    return {
      message: error?.message,
      status: false,
    };
  }
};

const UpdateOrder = async (_, { _id, input }) => {
  try {
    await OrderModel.findByIdAndUpdate({ _id: _id }, input, { new: true });
    return {
      message: "Order Updated Successfully",
      status: true,
    };
  } catch (error) {
    // console.log(error);
    return {
      message: "Something Went Wrong!",
      status: false,
    };
  }
};

const GetAllOrders = async (_, { first, last, createdAt }) => {
  try {

    const skip = last > 0 ? Math.max(0, first - last) : 0;
    const limit = last > 0 ? last : first;
    const DataOfCreated = await OrderModel.find({ createdAt: createdAt });
    const DataCrea = await OrderModel.find({ createdAt: createdAt })
      .skip(skip)
      .limit(limit)
      .exec();
    const Data = {
      Data: DataCrea,
      length: DataOfCreated?.length,
    };
    return Data;
  } catch (error) {

    return [{ process: error?.message }];
  }
};

const GetOrderByMonthYear = async (_, { year, month }) => {
  try {
    const DataOfMonthAndYear = await OrderModel.find({
      month: String(month),
      year: String(year)
    });

    const Data = {
      Data: DataOfMonthAndYear,
      length: DataOfMonthAndYear.length,
    };

    return Data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it further up the call stack
  }
}

module.exports = {
  CreateOrder,
  GetOrderByEmail,
  DeleteOrder,
  UpdateOrder,
  GetAllOrders,
  GetOrderByMonthYear
};
