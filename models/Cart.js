const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    items: [
        {
            sandwich: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'userSandwich',
                required: true,
            },
        }
    ],

    quantity: {
        type: Number
    },

    
    expiration: {
        type: Date,
    },

})



const Cart = mongoose.model('cart', cartSchema, 'carts');
module.exports = Cart;  