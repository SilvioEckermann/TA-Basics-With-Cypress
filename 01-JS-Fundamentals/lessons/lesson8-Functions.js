// functions

// declarative function
greet();
function greet() {
  console.log('Hello from declarative function');
}

// anonymous function
// greetAnonymous(); // error - function is not defined
var greetAnonymous = function () {
  console.log('Hello from anonymous function');
};
greetAnonymous();

// ES6 function syntax or arrow function
var greetArrowFunction = () => {
  console.log('Hello from arrow function');
};
greetArrowFunction();

// function with arguments
function greetWithArgs(name, age) {
  console.log(`Hello ${name} your age is ${age}`);
}
greetWithArgs('Hans', 42);

// function with return
function multiplyByTwo(number) {
  return number * 2;
}
console.log(multiplyByTwo(5));

// import function from another file
// add "type": "module", to package.json
import { printAge } from '../helpers/printHelper.js';
printAge(42);

// import everything from another file
import * as helper from '../helpers/printHelper.js';
helper.printAge(24);
