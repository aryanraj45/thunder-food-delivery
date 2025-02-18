const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    emailid: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    rollno: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    phoneno: {
        type: String, 
        required: true,
    },
    hostel_room: {
        type: String,
        required: false
    },
    profileURL: {
        type: String,
        required: false,
    },
    walletAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User',userSchema);