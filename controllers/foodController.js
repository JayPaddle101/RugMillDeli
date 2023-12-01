const Sandwich = require("../models/Sandwich");
const UserSandwich = require("../models/userSandwich");

//validate Sandwich Item
module.exports.valSandwich = async(req, res) =>{
    const requestedId = req.params.sandwichId;
     
    try {
        const selectedSandwich = await Sandwich.findById(requestedId);
        if (selectedSandwich) {
            // If a sandwich with the provided ID exists, return its data
            res.json({ isValid: true, sandwich: selectedSandwich });
          } else {
            // If the sandwich doesn't exist, return an error
            res.status(404).json({ isValid: false, error: 'Invalid sandwich ID'});
        }
    } catch (error) {
        // Handle any database-related errors
        console.error('Database Error:', error);
        res.status(500).json({ isValid: false, error: 'Internal server error' });
    }
    
} 



// controller actions

module.exports.breakfast_get = async (req, res) =>{
    const selectedFood = "Breakfast"; // Use the same variable name here
   
    try {
     const display_food = await Sandwich.getDisplaySandwichs(selectedFood); //Getting array of Sandwichs from db
     //console.log('Displayed BreakFast Sandwiches:');
     //console.log(display_breakfast);
     res.render("food", { selectedFood, display_food }); // Pass Info
        
    } catch (error) {
        console.log(error);
    }
}

module.exports.hamburger_get = async (req, res) =>{
    const selectedFood = "Hamburger"; // Use the same variable name here
   
    try {
     const display_food = await Sandwich.getDisplaySandwichs(selectedFood); //Getting array of Sandwichs from db
     //console.log('Displayed BreakFast Sandwiches:');
     //console.log(display_breakfast);
     res.render("food", { selectedFood, display_food }); // Pass Info
        
    } catch (error) {
        console.log(error);
    }
}

module.exports.chicken_get = async (req, res) =>{
    const selectedFood = "Chicken"; // Use the same variable name here
   
    try {
     const display_food = await Sandwich.getDisplaySandwichs(selectedFood); //Getting array of Sandwichs from db
     //console.log('Displayed BreakFast Sandwiches:');
     //console.log(display_breakfast);
     res.render("food", { selectedFood, display_food }); // Pass Info
        
    } catch (error) {
        console.log(error);
    }
}

module.exports.coldsub_get = async (req, res) =>{
    const selectedFood = "Coldsub"; // Use the same variable name here
   
    try {
     const display_food = await Sandwich.getDisplaySandwichs(selectedFood); //Getting array of Sandwichs from db
     //console.log('Displayed BreakFast Sandwiches:');
     //console.log(display_breakfast);
     res.render("food", { selectedFood, display_food }); // Pass Info
        
    } catch (error) {
        console.log(error);
    }
}

module.exports.hotsub_get = async (req, res) =>{
    const selectedFood = "Hotsub"; // Use the same variable name here
   
    try {
     const display_food = await Sandwich.getDisplaySandwichs(selectedFood); //Getting array of Sandwichs from db
     //console.log('Displayed BreakFast Sandwiches:');
     //console.log(display_breakfast);
     res.render("food", { selectedFood, display_food }); // Pass Info
        
    } catch (error) {
        console.log(error);
    }
}

module.exports.salad_wrap_get = async (req, res) =>{
    const selectedFood = "Salad&Wrap"; // Use the same variable name here
   
    try {
     const display_food = await Sandwich.getDisplaySandwichs(selectedFood); //Getting array of Sandwichs from db
     //console.log('Displayed BreakFast Sandwiches:');
     //console.log(display_breakfast);
     res.render("food", { selectedFood, display_food }); // Pass Info
        
    } catch (error) {
        console.log(error);
    }
}


module.exports.customize_get = async (req,res) =>{

    const requestedId = req.params.sandwichId;

    try {
        const sandwich = await Sandwich.findById(requestedId);
    
        if (sandwich) {

            const userSandwich = new UserSandwich({
                name: sandwich.name,
                base_price: sandwich.base_price,
                actual_price:0.00,
                category: sandwich.category,
                image: sandwich.image,
                quantity: 1,
                customizations: [],
                submitted: false, // Set it to false by default
            });

            // Save the userSandwich document to the database
            //await userSandwich.save();
            

            res.render("food_custom", { sandwich });
            
        } else {
            console.log("Could Not Find Sandwich");
            res.status(404).send("Sandwich Not Found");
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
}