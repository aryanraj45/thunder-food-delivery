const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    customerid: {
        type: String, 
        required: true
    },
    items: {
        type: Object,
        required: true
    },
    orderid: {
        type: String,
        required: true
    },
    paymentid: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isDelivered: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Order',orderSchema);