const mongoose = require('mongoose');


var formData = new mongoose.Schema({
        email: String,
        fname:String,
        lname: String,
        mobile: String,
        password: String
    })

module.exports = mongoose.model('formData', formData);