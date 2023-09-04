




// controller actions 
module.exports.breakfast_get = (req, res) =>{
    const selectedFood = "Breakfast"; // Use the same variable name here
    res.render("food", { selectedFood }); // Pass it as selectedFood
    
}