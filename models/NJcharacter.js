const mongoose = require('mongoose')
const Schema = mongoose.Schema

const characterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    house: {
        type: String,
        required: true,
        enum: ["winterfell", "tarley", "lannister"]
    },
    isAlive: {
        type: Boolean,
        default: true
    }
})
                            // Model Name    // Model Blueprint
module.exports = mongoose.model("Character", characterSchema)