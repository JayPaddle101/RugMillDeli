const selectedIngredients = [];
let total_price = 0;

// Function to update the total price based on selected cards and active buttons
function updateTotalPrice() {

   // Get all selected cards
   const selectedCards = document.querySelectorAll('.selected');

   // Initialize the total price
   let totalPrice = 0;

   // Iterate through selected cards and calculate the total price
   selectedCards.forEach((card) => {
    const cardDescriptionElement = card.querySelector('p.card-description');
    const cardPrice = parseFloat(cardDescriptionElement.getAttribute('data-card-money'));

    // Check for buttons within the card
    const buttons = card.querySelectorAll('.buttons button');
    buttons.forEach((button) => {
      if (button.classList.contains('active')) {
        const extraPrice = parseFloat(button.getAttribute('data-extra-price'));
        if (!isNaN(extraPrice)) {
          // Add the extra price to the total price
          totalPrice += extraPrice;
        }
      }
    });

    // Add the card price to the total price
    totalPrice += cardPrice;
   });

    // Get the counter element
    const counterElement = document.querySelector('.counter');

    // Get the counter value as an integer
    const counterValue = parseInt(counterElement.textContent);

    // Multiply the total price by the counter value
    totalPrice *= counterValue;

    // Format the total price to have exactly two decimal places
    totalPrice = totalPrice.toFixed(2);

    // Convert the formatted total price back to a number
    totalPrice = parseFloat(totalPrice);

    // Update the Dynamic-Price element with the formatted total price
    const dynamicPriceElement = document.querySelector(".Dynamic-Price");
    if (dynamicPriceElement) {
      // Use toFixed() again to ensure two decimal places with trailing zero
      dynamicPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }
}

function updateIngredients() {
  // Get all selected cards
  const selectedCards = document.querySelectorAll('.selected');

  // Initialize an array to store selected ingredients
  const selectedIngredients = [];

  // Iterate through selected cards and collect their ingredient names
  selectedCards.forEach((card) => {
    const cardTitleElement = card.querySelector('.card-title');
    const ingredientName = cardTitleElement.textContent;

    // Check if the ingredient is not already in the list
    if (!selectedIngredients.includes(ingredientName)) {
      selectedIngredients.push(ingredientName);
    }
   });

    // Update the Dynamic-Ingredient element with the selected ingredients
    const dynamicIngredientElement = document.querySelector('.Dynamic-Ingredient');
    if (dynamicIngredientElement) {
      dynamicIngredientElement.textContent = selectedIngredients.join(', ');
    }
}


//Intial Start Up
document.addEventListener('DOMContentLoaded', (event) => {

    // Iterate over initially selected cards and update selectedIngredients
    const initiallySelectedCards = document.querySelectorAll('.selected');
    //Update Ingredients and Price
    updateIngredients();
    updateTotalPrice();

});
  
  
const containers = document.querySelectorAll('.container');

containers.forEach((container) => {
 const cards = container.querySelectorAll('.card');


  cards.forEach((card) => {

   const buttons = card.querySelector(".buttons");
   const cardContent = card.querySelector(".card-content");
   const imgClass = card.querySelector(".img-class");

    let isButtonVisible = !!buttons;


    card.addEventListener("click", (event) => {

      const cardDescriptionElement = event.currentTarget.querySelector('p.card-description');

      // Now, you can access the price data attribute of the clicked card
      const cardPrice = cardDescriptionElement.getAttribute('data-card-money');
      console.log('Card Price:', cardPrice);

      if (isButtonVisible) {
        // Toggle the visibility of buttons, imgClass, and hide other card content
        buttons.style.display = buttons.style.display === "none" || buttons.style.display === "" ? "flex" : "none";
        imgClass.style.display = buttons.style.display === "none" ? "block" : "none";
        cardContent.style.display = buttons.style.display === "none" ? "block" : "none";
      }

      

      // Check if the card is already selected
      const isSelected = card.classList.contains("selected");

      // Check if the container allows multi-card selection
      const isMultiCardContainer = container.dataset.multiCard === "true";

      // Check if the container allows raw-card selection
      const isRawCardContainer = container.dataset.rawCard === "true";

      //Check if it's a raw-card and if it's already selected when you click it again it will de-select card
      if(isRawCardContainer && isSelected ){
        card.classList.toggle("selected");
        console.log("Heeelolol")
      }

      // If it's a multi-card container or the card is not already selected, toggle the "selected" class
      if (isMultiCardContainer || !isSelected) {
        card.classList.toggle("selected");
      }

      // If it's a mult-card and is selected and has buttons when clicked it will turn off the button container and show regualr card content 
      if(isMultiCardContainer || isRawCardContainer && isSelected && buttons){
        console.log("Hey Man")
        buttons.style.display = "none";
        imgClass.style.display = "block";
        cardContent.style.display = "block";
      }

      // Remove the "selected" class from all other cards in the same container if it's not a multi-card container
      if (!isMultiCardContainer) {
        cards.forEach((containerCard) => {
          if (containerCard !== card) {
            containerCard.classList.remove("selected");
            const containerButtons = containerCard.querySelector(".buttons");
            const containerImgClass = containerCard.querySelector(".img-class");
            const containerCardContent = containerCard.querySelector(".card-content");
            if (containerButtons) {
              containerButtons.style.display = "none";
              containerImgClass.style.display = "block";
              containerCardContent.style.display = "block";
            }
          }

        });
      }

      //Update Price And Ingredient Array
      updateIngredients();
      updateTotalPrice();
      console.log(selectedIngredients);

    });

  

    const options = card.querySelectorAll(".buttons button");

    options.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();

        // Remove the "active" class from all buttons within the same card
        options.forEach((btn) => btn.classList.remove("active"));

        // Add the "active" class to the clicked button
        button.classList.add("active");

        // Hide buttons, show imgClass, and cardContent
        buttons.style.display = "none";
        imgClass.style.display = "block";
        cardContent.style.display = "block";
        
        //Update Price
        updateTotalPrice();
       });
    });

  });
});


const minusButton = document.querySelector('.minus-btn');
const plusButton = document.querySelector('.plus-btn');
const counter = document.querySelector('.counter');

minusButton.addEventListener('click', function () {
    let count = parseInt(counter.textContent);
    if (count > 1) {
      count--;
      counter.textContent = count;
      }else{
        minusButton.style.color = "grey";
      }
    //Update Price
    updateTotalPrice();
});

plusButton.addEventListener('click', function () {
    let count = parseInt(counter.textContent);
    minusButton.style.color = "#059511";
    count++;
    counter.textContent = count;
    //Update Price
    updateTotalPrice();
}); 

const cartIcon = document.querySelector('.fa-cart-shopping');
const cartSizeSpan = document.querySelector('.cart-size');

  if (cartIcon || cartSizeSpan) {
     cartIcon.addEventListener('click', async function () {
     console.log('Cart Icon clicked!');
       try {
        const res = await fetch('/toCart', {
          method: 'GET',
        });

        if (res.status === 204) {
          // Handle the case when there's nothing in the cart (status 204)
          alert('Nothing in the cart.');
        } else {
          const data = await res.json();
          console.log(data);
          if (data.valid) {
            window.location.href = `/getCart/${data.cartID}`;
          } else {
            alert(data.message);
          }
        }
       } catch (error) {
        console.error('Error:', error);
        alert('User Cart is not findable');
       }
     });
   }  
