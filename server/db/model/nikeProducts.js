const mongoose = require('mongoose');

const products = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    size : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true
    }
});

module.exports = mongoose.model('nike-products',products);