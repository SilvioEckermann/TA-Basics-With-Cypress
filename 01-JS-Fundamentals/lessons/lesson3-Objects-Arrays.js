// objects
var customer = {
  firstName: 'Hans',
  lastName: 'Dampf',
  cars: ['BMW', 'Audi', 'VW'],
};

console.log(customer);
console.log(customer.firstName);

customer.firstName = 'Hans';
customer['lastName'] = 'Dampf';
console.log(customer.firstName);
console.log(customer.lastName);
console.log(`${customer.firstName} ${customer.lastName}`);

// arrays
var colors = ['red', 'green', 'blue'];
console.log(colors);
console.log(colors[0]);
console.log(colors[2]);
colors[1] = 'yellow';
console.log(colors.length);

console.log(customer.cars[0]);
