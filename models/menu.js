const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    dish_name: {
        type: String,
        required: true,
    },
    dish_price: {
        type: String,
        required: true,
    },
    dish_imageurl: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Menu',menuSchema);