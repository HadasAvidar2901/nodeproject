import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";

const minimalJewellerySchema = mongoose.Schema({
    name: String,
    price: Number,
    amount:Number
})

const orderSchema = mongoose.Schema({
   
    orderDate:  { type: Date, default: Date.now() },
    orderDeadline:{type:Date},
    addres: { type: String},
    idCustomer:{type:String},//לשאול אם זה נכון הסוג
    ordersProducts:[minimalJewellerySchema],
    isSent: { type: Boolean, default: false } 
})

export const orderModel = mongoose.model("order", orderSchema);

export const orderValidator = (_order) => {
    const orderValidationSchema = Joi.object({
        addres: Joi.string().min(3).max(100).required(),
        idCustomer: Joi.string().min(0).max(100),
        orderDate:Joi.date(),
        orderDeadline:Joi.date(),
        ordersProducts:Joi.array(),
        isSent:Joi.boolean()
    })
    return orderValidationSchema.validate(_order);
}



