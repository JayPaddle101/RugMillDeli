const mongoose = require('mongoose');


const optionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    image: {
        type: String,
    },

    price: {
        type: Number,
        required: true,
    },

    less: {
        type: Boolean,
        default: false,
    },

    extra: {
        type: Boolean,
        default: false,
    },

    extra_price: {
        type: Number,
    },

    default_option:{
        type: Boolean
    }

});


const customizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
    options: [optionSchema],
});


const sandwichSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true,
    },

    base_price:{
        type: Number,
        required: true,
    },

    category: {
        type: String,
    },

    description: {
        type: String,
        required: true,
    },

    icon: {
        type: String,
        required: true,
    },

    display: {
        type: Boolean,
        default: true,
    },
  
    image: {
        type: String,
    },

    customizations: [customizationSchema]
 
})



sandwichSchema.statics.getDisplaySandwichs = async function(thiscategory) {
    try {
        const displayedSandwichs = await this.find({ display:true, category: thiscategory});
        return displayedSandwichs;
    
    } catch (error) {
        console.log('Error', error);
    }
}


const Sandwich = mongoose.model('sandwich', sandwichSchema, 'sandwichs');
module.exports = Sandwich; 