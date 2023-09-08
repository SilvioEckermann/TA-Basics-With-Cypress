// classes
import { Person } from '../helpers/printHelper.js';
import { employee } from '../helpers/printHelper.js';

var person = new Person('Hans', 42);
person.printName();
person.printAge();

employee.printName();
employee.printAge();
employee.printSalary(2000);
