const mongoose = require('mongoose');


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

    display: {
        type: Boolean,
        default: true,
    },
  
    image: {
        type: String,
    }

 
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