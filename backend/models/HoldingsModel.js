import mongoose, {Schema} from "mongoose";

const HoldingSchema = new Schema({
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
    net:{
        type: String,
    },
    day:{
        type: String,
    },
    owner:{
        type: Schema.Types.ObjectId,
        required: true,
    }
});

const HoldingsModel = mongoose.model("Holding", HoldingSchema);

export {HoldingsModel};