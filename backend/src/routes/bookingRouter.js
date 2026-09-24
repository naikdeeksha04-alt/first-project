import express from "express";
const bookingRouter=express.Router();
import{
        getBookingDetails,getUserBooking,verifyPayment,createOrder
}from "../controllers/bookingController.js"
import {protect} from "../controllers/authController.js"
bookingRouter.get("/",protect,getUserBooking);
bookingRouter.get("/:bookingId",protect,getBookingDetails);
bookingRouter.post("/create-order",protect,createOrder);
bookingRouter.post("/verify-payment",protect,verifyPayment);
export {bookingRouter};
