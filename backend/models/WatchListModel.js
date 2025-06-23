import mongoose, {Mongoose, Schema} from "mongoose";

const WatchListSchema = new Schema({
    name: {
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
        type:Schema.Types.ObjectId,
        required: true,
    },
});

const WatchListModel = mongoose.model('WatchList',WatchListSchema);

export {WatchListModel};