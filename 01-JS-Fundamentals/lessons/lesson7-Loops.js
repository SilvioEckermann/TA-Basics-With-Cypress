// Loops
// for loop
for (var i = 0; i < 3; i++) {
  console.log(i);
}

// for of loop
var cars = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];
for (let car of cars) {
  console.log(car);
  if (car === "Ford") {
    break;
  }
}

// ES6 Syntax for each loop
console.log("ES6 Syntax for each loop:");
cars.forEach((car) => console.log(car));
