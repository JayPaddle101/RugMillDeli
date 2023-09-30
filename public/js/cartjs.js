// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
   // Get all elements with class "Sandwich_Data"
    const sandwichDataElements = document.querySelectorAll('.Sandwich_Data');
    const orderList = document.getElementById('order-list');
    
   // Get the empty cart message element
   const emptyCartMessage = document.querySelector('.empty');

   // Check if there are any .Sandwich_Data elements
    if (sandwichDataElements.length > 0) {
      // If there are, hide the empty cart message
      emptyCartMessage.style.display = 'none';
    } else {
      // If there are none, show the empty cart message
      emptyCartMessage.style.display = 'block';
    }

   // Initialize total price to 0 and tax rate
    let totalPrice = 0;
    const taxRate = 0.066;
  
    // Loop through each .Sandwich_Data element
    sandwichDataElements.forEach((element) => {
      // Extract the price from the element's data attribute
      console.log(element.querySelector('.price').getAttribute('data-item-price'))
      const itemPrice = parseFloat(element.querySelector('.price').getAttribute('data-item-price'));
      // Add the item price to the total price
      totalPrice += itemPrice;
    });

    const taxAmount = totalPrice * taxRate; 
    const actual_total = taxAmount + totalPrice 
  
    // Update the content with the calculated total price
    const dynamicTotalElement = document.querySelector('.dynamic-total');
    const dynamicTaxElement = document.querySelector('.dynamic-tax');
    const dynamicActualTotalElement = document.querySelector('.dynamic-final-price');

    dynamicTotalElement.textContent = `$${totalPrice.toFixed(2)}`; // Display total price with 2 decimal places
    dynamicTaxElement.textContent = `$${taxAmount.toFixed(2)}`; // Display tax price with 2 decimal places
    dynamicActualTotalElement.textContent = `$${actual_total.toFixed(2)}`; // Display  actual total price with 2 decimal places


});