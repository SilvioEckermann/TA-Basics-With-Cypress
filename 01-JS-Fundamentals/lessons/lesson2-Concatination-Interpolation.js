// concatination and interpolation
var price = 42;
var itemName = 'item';
var messageToPrint1 = 'The price for the ' + itemName + ' is ' + price + ' Euros'; // concatination
var messageToPrint2 = `The price for the ${itemName} is ${price} Euros`; // interpolation

console.log(messageToPrint1);
console.log(messageToPrint2);

// concatenation is typically used in a lot of languages
// interpolation is typically used in JS
