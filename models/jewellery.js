import Joi from "joi";
import mongoose from "mongoose";



const jewellerySchema = mongoose.Schema({
    name: { type: String },
    price:{type:Number},
    description:{type:String},
    produceDate: { type: Date, default: Date.now() },
    img:{ type: String}
    
})

export const JewelleryModel = mongoose.model("jewellery", jewellerySchema);

export const jewelleryValidator = (_jewellery) => {
    const jewelleryValidationSchema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        price: Joi.number().min(0).max(10000).required(),
        description:Joi.string(),
        produceDate:Joi.date(),
       img:Joi.string().uri()

    })
    return jewelleryValidationSchema.validate(_jewellery);
}

export const jewelleryUpdateValidator = (_jewellery) => {
    const jewelleryUpdateValidationSchema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        price: Joi.number().min(0).max(10000).required(),
        description:Joi.string(),
        produceDate:Joi.date(),
       img:Joi.string().uri()

    })
    return jewelleryUpdateValidationSchema.validate(_jewellery);
}