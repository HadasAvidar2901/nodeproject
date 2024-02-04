import { JewelleryModel } from "../models/jewellery.js";
import { orderModel ,orderValidator} from "../models/orders.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";


 export const getOrderByUserId = async (req, res) => {
    let  id  = req.user._id;
    try {
         if (!mongoose.isValidObjectId(id)) {
             res.status(400);
             throw new Error('קוד לא הגיוני')
         }
        
        let allOrder = await orderModel.find({idCustomer:id});
        
        return res.json(allOrder)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get order" })
    }

}


export const deleteOrder = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "not valid id", message: "id not in right format" })
        let order1=await orderModel.findById(id);
        if(!order1)
           return res.status(404).json({ type: "no order to delete", message: "no order with such id to delete" })
        if(order1.isSent==true)
          return res.status(404).json({ type: "cant delete", message: "can not delete order that was send" })
        let order = await orderModel.findByIdAndDelete(id);
        
        return res.json(order)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get order" })
    }

}

export const addOrder = async (req, res) => {
    let { orderDate, orderDeadline, addres, ordersProducts} = req.body;

    const result = await orderValidator(req.body);
    console.log(result)
    if(result.error)
        return res.status(404).json( result.error.details[0])
    try {
        
        let newOrder = new orderModel({ orderDate, orderDeadline, addres, ordersProducts,idCustomer:req.user._id});
        await newOrder.save();

        return res.json(newOrder)
     
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get order" })
    }

}


export const updatOrder = async (req, res) => {

    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ type: "not valid id", message: "id not in right format" })
    try {
        let order = await orderModel.findById(id);
        if (!order)
            return res.status(404).json({ type: "order not found", message: "no order with such id" })


        let updated = await orderModel.findByIdAndUpdate(id,{isSent:req.body.isSent}, { new: true })

        return res.json(updated);

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get order" })
    }
}



export const getAllOrders = async (req, res) => {

    try {

        let allOrders = await orderModel.find({});
        res.json(allOrders);

    } catch (err) {
        res.status(400).json({ type: "invalid operation", message: "cannot sign in order" })
    }
}