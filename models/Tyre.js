const mongoose = require("mongoose");

const tyreSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    type: {
        type: String,
        enum: ["Car", "Bike", "Truck"],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Tyre = mongoose.model("Tyre", tyreSchema);
module.exports = Tyre;
