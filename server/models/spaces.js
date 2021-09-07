import mongoose from "mongoose";

const spacesSchema = mongoose.Schema({
    userID: {type: String},
    title: {type: String},
    date: {type: Date, default: new Date()},
    spaces: {
        devices: Array,
        API: Array
    }
})

export default mongoose.model("Spaces", spacesSchema);
