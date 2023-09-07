const Sandwich = require("../models/Sandwich");


//validate Sandwich
module.exports.valSandwich = async(req, res) =>{
    const requestedId = req.params.sandwichId; //changed to not int

     
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
     const display_breakfast = await Sandwich.getDisplaySandwichs(selectedFood); //Getting array of Sandwichs from db
     console.log('Displayed BreakFast Sandwiches:');
     console.log(display_breakfast);
     res.render("food", { selectedFood, display_breakfast }); // Pass Info
        
    } catch (error) {
        console.log(error);
    }
  
}