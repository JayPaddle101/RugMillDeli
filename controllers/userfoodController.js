const Sandwich = require("../models/Sandwich");
const UserSandwich = require("../models/userSandwich");

//validate UserSandwich

module.exports.valIngSandwich = async(req, res) =>{
    const { selectedItems } = req.body;
    //console.log(selectedItems);
  
    // Validate the selected items using the Sandwich model static method
    const validationResponse = await Sandwich.validateItems(selectedItems);
  
    if (validationResponse.valid) {
      // If all selected items are valid, you can proceed to now making the Sandwich
      res.json({ valid: true, message: validationResponse.message });
    } else {
      // If there are validation errors, return an error response
      res.status(400).json({ error: validationResponse.message });
    }
}
