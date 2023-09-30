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

})


usersandwichSchema.statics.makeSandwich = async function(selectedItems, sandwich, amount) {

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
                //console.log("Current ID Name: " + option.name + " Current ID: " + option._id)
                if(cardId == option._id){
                    console.log("Match at Current Card ID: " + cardId + " And at optionId: " + option._id);
                     
                    if(extraButtonActive){
                        ingredients.push("Extra " + option.name);
                        basePrice += option.price + option.extra_price;

                    } else if (lessButtonActive){
                        ingredients.push("Less " + option.name);
                        basePrice += option.price

                    }else{
                        ingredients.push(option.name);
                        basePrice += option.price

                    }

                }
                }
   
            }  

        }
    
        // Build the ing_list by joining ingredients with commas
        const ingList = ingredients.join(', ');
        console.log("This is Ing List: " + ingList);
    
        // Calculate the actual_price as base_price times the quantity
        const actualPrice = basePrice * amount;
        console.log("This is Base Price: " + basePrice);
        console.log("This is Actual Price: " + actualPrice);

        // Create a new UserSandwich document
        const newUserSandwich = new this({
          submited: false, // Adjust as needed
          name: sandwich.name,
          base_price: basePrice,
          actual_price: actualPrice,
          category: sandwich.category,
          image: sandwich.image,
          quantity: amount, // Set the quantity as needed
          ing_list: ingList, // Add the ing_list
        });
    
        // Save the new UserSandwich document
        const savedUserSandwich = await newUserSandwich.save();
        return { valid: true, message: 'Valid Post Request', userSanID: savedUserSandwich._id, amount: savedUserSandwich.quantity };

      } catch (error) {
        console.error('Error:', error);
        return { valid: false, message: 'Internal server error' };
      }
     
}




const userSandwich = mongoose.model('usersandwich', usersandwichSchema, 'usersandwichs');
module.exports = userSandwich;  