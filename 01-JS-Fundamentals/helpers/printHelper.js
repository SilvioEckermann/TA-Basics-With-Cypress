export function printAge(age) {
  console.log(`I am ${age} years old`);
}

export class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  printName() {
    console.log(`My name is ${this.name}`);
  }

  printAge() {
    console.log(`I am ${this.age} years old`);
  }
}

class Employee extends Person {
  /**
   * This method will print the salary.
   * @param {*} salary
   */
  printSalary(salary) {
    console.log(`My salary is ${salary} euros`);
  }
}

export const employee = new Employee("Max", 42); // export an instance of Employee class
