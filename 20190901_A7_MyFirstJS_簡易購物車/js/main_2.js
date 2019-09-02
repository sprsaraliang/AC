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
const shippingCost = 140;//運費，

var total = 0;
var pay = 0;

// add items
function addItemToCart(product){
 total+=catalog[product];
 priceTopay();
}

//消費金額沒有到達 $4000 門檻，需要支付運費 $140
function priceTopay(){
 if (total <4000){
  pay=total+shippingCost;
 }
}

// print total
function priceTotal(){
  console.log("Subtotal：$"+total);
  console.log("Added shipping：$"+shippingCost);
  console.log("Final Price$：$"+pay);
}

addItemToCart('skirt');
addItemToCart('shorts');
priceTotal();