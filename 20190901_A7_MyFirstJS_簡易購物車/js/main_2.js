const catalog = {
  hoodie: 1000,
  shorts: 300,
  't-shirt': 220,
  skirt: 820,
  'raw denim': 3565,
  blouse: 490,
  socks: 150
}

const shoppingCart = [];
const shippingCost = 140;


var total = 0;

// add items
function addItemToCart(product){
 total+=catalog[product];
}


// print total
function priceTotal(){
  console.log("Subtotal：$"+total);
  console.log("Added shipping：$"+shippingCost);
  console.log("Final Price$："+(total +shippingCost));
}

addItemToCart('skirt');
addItemToCart('shorts');
priceTotal();