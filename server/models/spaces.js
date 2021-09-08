import mongoose from "mongoose";

const spacesSchema = mongoose.Schema({
    userID: {type: String},
    spaces: {type: String},
    numSpaces: {type: Number, default: 0}
})

export default mongoose.model("Spaces", spacesSchema);
