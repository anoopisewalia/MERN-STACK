import express from 'express'

import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus ,VerifyStripe, verifyRazorpay} from '../controllers/orderController.js';

const orderRouter = express.Router();

//Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);


//Payment Features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderStripe);

//User Feature
orderRouter.post('/userorders', authUser, userOrders);

//varify Payment
orderRouter.post("/verifyStripe", authUser, VerifyStripe);
orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay);


export default orderRouter;



