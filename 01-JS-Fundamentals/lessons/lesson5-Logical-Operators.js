// logical operators
// "AND" - &&
// "OR" - ||
// "NOT" - !

console.log(true && true); // all values have to be true to return true
console.log(true || false); // only one value has to be true to return true
console.log(!true); // returns the opposite of the value

var ageIsMoreThan18 = true;
var hasDriversLicense = true;

var canDrive = ageIsMoreThan18 && hasDriversLicense;
console.log("The person is allowed to drive: " + canDrive);
