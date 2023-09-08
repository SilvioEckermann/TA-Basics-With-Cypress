/// <reference types="cypress" />

describe('JSON objects', () => {
  it.only('JSON objects', () => {
    cy.openHomePage();
    const simpleObject = { key: 'value', key2: 'value2' };
    const simpleArrayOfValues = ['one', 'two', 'three'];
    const arrayOfObjects = [{ key: 'value' }, { key2: 'value2' }, { key3: 'value3' }];
    const typeOfData = { string: 'this is a string', number: 10 };

    const mix = {
      FirstName: 'Max',
      LastName: 'Mustermann',
      Age: 42,
      Dogs: [
        { Name: 'Rainer', Age: 3 },
        { Name: 'Heinrich', Age: 3 },
      ],
    };

    console.log(simpleObject.key2);
    console.log(simpleObject['key2']);
    console.log(simpleArrayOfValues[1]);
    console.log(arrayOfObjects[2].key3);
    console.log(mix.Dogs[0].Name);
  });
});
