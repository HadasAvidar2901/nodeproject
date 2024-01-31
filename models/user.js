import mongoose from "mongoose";
import Joi from "joi";
import  jwt  from "jsonwebtoken";


const userSchema = mongoose.Schema({
   
    userName: {type: String},
    password: {type: String},
    email: { type: String, unique: true },
    role:{type:String,default:'USER'},
    registrationDate:{type:Date,default:Date.now()}

})

export const userModel = mongoose.model("users", userSchema)

export const userValidator = (_user) => {
    const userValidationSchema = Joi.object({
        userName: Joi.string().min(3).max(5).required(),
        password: Joi.string().min(1).max(9).required(),
        email:Joi.string().email().required(),
        role:Joi.string(),
        registrationDate:Joi.date()

    })
    return userValidationSchema.validate(_user);
}

export const generateToken = (_id,userName,role)=>
{
    let token = jwt.sign({ _id, userName, role },
        process.env.SECRET_JWT, {
         expiresIn: "1h"
        });
         return token;
}