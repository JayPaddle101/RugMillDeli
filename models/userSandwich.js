const mongoose = require('mongoose');
const Sandwich = require("../models/Sandwich");


const usersandwichSchema = new mongoose.Schema({
     
    submited: {
        type: Boolean,
        default: false,
    },  

    name: {
        type: String,
        //required: true,
    },

    base_price:{
        type: Number,
        //required: true,
    },

    actual_price:{
        type: Number,
        //required: true,
    },

    ing_list: {
        type: String,
        //required: true,
    },

    category: {
        type: String,
    },

    image: {
        type: String,
    },

    quantity: {
        type: Number,
        //required: true,
    },

    // An array of objects to store customization IDs and quantities
    customizations: [{
     customization_id: {
      type: String,
     },
     ing_quantity: {
        amount:{
            type: String,
        },

        extra_amount:{
            type: Number,
        },
      },
   }],

})


usersandwichSchema.statics.makeSandwich = async function(selectedItems, amount , sandwich) {

    try {
        // Calculate the base_price and build the ing_list based on selected items
        let basePrice = 0;
        const ingredients = [];
        const customizations = [];
    
        for (const selectedItem of selectedItems) {
          const { cardId, extraButtonActive, lessButtonActive } = selectedItem;
          console.log(cardId, extraButtonActive, lessButtonActive);
  
           // Initialize variables to store the customization and option
            let foundCustomization = null;
            let foundOption = null;



            // Loop through customizations
            for (const customization of sandwich.customizations) {
                // Loop through options within each customization
                for (const option of customization.options) {
                // Check if the option exists and matches the cardId
                console.log("Current ID Name: " + option.name + " Current ID: " + option._id)
 
                }
   
            }

            
         
        }
    
        // Build the ing_list by joining ingredients with commas
        const ingList = ingredients.join(', ');
    
        // Calculate the actual_price as base_price times the quantity
        const actualPrice = basePrice * amount;
    
        // Create a new UserSandwich document
        const newUserSandwich = new this({
          submited: false, // Adjust as needed
          name: sandwich.name,
          base_price: basePrice,
          actual_price: actualPrice,
          category: sandwich.category,
          image: sandwich.image,
          quantity: amount, // Set the quantity as needed
          customizations: customizations,
          ing_list: ingList, // Add the ing_list
        });
    
        // Save the new UserSandwich document
       // const savedUserSandwich = await newUserSandwich.save();
        return { valid: true, message: 'Valid Post Request'};

      } catch (error) {
        console.error('Error:', error);
        return { valid: false, message: 'Internal server error' };
      }
     
}




const userSandwich = mongoose.model('usersandwich', usersandwichSchema, 'usersandwichs');
module.exports = userSandwich;  