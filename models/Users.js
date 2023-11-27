const mongoose = require('mongoose');
const moment = require('moment')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: false
    },
    phone:{
        type: Number,
        required: false
    },
    created:{
        type: String,
        required: false,
        default: moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    image:{
        type: Array,
        required: false,
    }
})

module.exports = mongoose.model('users', userSchema);