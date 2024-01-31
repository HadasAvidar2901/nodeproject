import mongoose from "mongoose";
import { JewelleryModel, jewelleryValidator,jewelleryUpdateValidator } from "../models/jewellery.js"



export const getAllJewellery = async (req, res, next) => {

    let txt = req.query.txt || undefined;
    let page = req.query.page || 1;
    let perPage = req.query.perPage || 30;

    try {

        let allJewellery = await JewelleryModel.find({
            $or:
                [{ name: txt },{ description: txt }]
        }).skip((page - 1) * perPage).limit(perPage);
        //pagination
       return res.json(allJewellery)

    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get jewellery" })
    }
}



export const getJewelleryById = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id)) {
            res.status(400);
            throw new Error('קוד לא הגיוני')
        }
       
        let jewellery = await JewelleryModel.findById(id);
        if (!jewellery)
            return res.status(404).json({ type: "no id", message: "no jewellery with such id" })
        return res.json(jewellery)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get jewellery" })
    }

}


export const deleteJewellery = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "not valid id", message: "id not in right format" })
        let jewellery = await JewelleryModel.findByIdAndDelete(id);
        if (!jewellery)
            return res.status(404).json({ type: "no jewellery to delete", message: "no course with such id to delete" })

        return res.json(jewellery)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get jewellery" })
    }

}

export const addJewellery = async (req, res) => {
    let { name, price, description, produceDate,img} = req.body;


    const result = await jewelleryValidator(req.body);
    console.log(result)
    if(result.error)
        return res.status(404).json( result.error.details[0])
    try {
        let sameJewellery = await JewelleryModel.findOne({ name: name });
        if (sameJewellery)
            return res.status(409).json({ type: "same details", message: "there is already same jewellery" })
        let newJewellery = new JewelleryModel({ name, price, description, produceDate, img });
        await newJewellery.save();

        return res.json(newJewellery)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get jewllery" })
    }

}


export const updateJewellery = async (req, res) => {

    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ type: "not valid id", message: "id not in right format" })
    const result = await jewelleryUpdateValidator(req.body);
    console.log(result)
    if(result.error)
      return res.status(404).json( result.error.details[0])
    try {
        let jewellery = await JewelleryModel.findById(id);
        if (!jewellery)
            return res.status(404).json({ type: "jewellery not found", message: "no jewellery with such id" })
       

        let updated = await JewelleryModel.findByIdAndUpdate(id, req.body, { new: true })

        return res.json(updated);

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get jewellery" })
    }

}