const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const businessCardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    designation: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/]
    },
    website: {
        type: String,
        required: true,
        trim: true,
    },
    social: {
        type: [{type:String}, {type:String}, {type:String}],
        required: true
    },

    companyLogo: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('businessCard', businessCardSchema);