const mongoose = require('mongoose');


const optionSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId, // Explicitly define _id

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

    display_price:{
        type: Boolean,
    },

    show_display_price:{
        type: Number
    },

    extra_options: {
        type: Boolean,
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

    multi_card: {
        type: Boolean,
    },

    raw_card: {
        type: Boolean,
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
        required: true,
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


sandwichSchema.statics.validateItems = async function (selectedItems) {
    try {

      for (const selectedItem of selectedItems) {
        const { cardId , itemId } = selectedItem;
        // Check if cardId and itemId are valid mongoose ObjectId
        if (!mongoose.Types.ObjectId.isValid(cardId) || !mongoose.Types.ObjectId.isValid(itemId)) {
          return { valid: false, message: 'Invalid ID in selected items' };
        }

        // Perform any additional validation or processing here
        // For example, you can fetch the corresponding Sandwich document
        const sandwich = await this.findById(itemId);
      
  
        if (!sandwich) {
          return { valid: false, message: 'Sandwich not found for itemId ' + itemId };
        }
      }
        
      // If all selected items are valid
      const id = selectedItems[0].itemId;
      const value = selectedItems[0].counterValue;
      const sandwich = await this.findById(id);
      
      return { valid: true, message: 'Selected items are valid', sandwich, value };

    } catch (error) {
      console.error('Error:', error);
      return { valid: false, message: 'Internal server error' };
    }
};

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