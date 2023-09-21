const mongoose = require('mongoose');

const usersandwichSchema = new mongoose.Schema({
     
    submited: {
        type: Boolean,
        default: false,
    },  

    name: {
        type: String,
        required: true,
    },

    base_price:{
        type: Number,
        required: true,
    },

    actual_price:{
        type: Number,
        required: true,
    },

    category: {
        type: String,
    },

    image: {
        type: String,
    },

    quantity: {
        type: Number,
        required: true,
    },

    // An array of objects to store customization IDs and quantities
    customizations: [{
     customization_id: {
      type: String,
     },
     quantity: {
      type: Number,
      default: 1, // Default quantity is 1, you can change it as needed
      },
   }],


})


const userSandwich = mongoose.model('usersandwich', usersandwichSchema, 'usersandwichs');
module.exports = userSandwich;  