import mongoose, { Schema } from "mongoose";

const Orderschema = new Schema({
    name:{
        type: String,
        required: true,
    },
    qty:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    avg:{
        type: Number,
    },
    owner:{
        type:String,
        required: true,
    },
})

const OrderModel = mongoose.model("Order", Orderschema);
export {OrderModel};