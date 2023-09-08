/// <reference types="cypress" />
// This is needed to get intellisense for Cypress commands

describe('Our first test suite', () => {
  it('first test', () => {
    cy.visit('/'); // visit the base url
    cy.contains('Forms').click(); // find the element with text "Forms" and click it
    cy.contains('Form Layouts').click(); // find the element with text "Form Layouts" and click it
    // When search for text always look in the DOM, because Style Sheet can change the text!!!
    // cy.contains will find first element with the text

    // Cypress is using the jQuery selector engine
    // xpath is not supported, but you can use the cypress-xpath plugin (not recommended)

    // by Tag Name
    cy.get('input');

    // by ID
    cy.get('#inputEmail1'); // # is used to select by ID

    // by Class Name
    cy.get('.input-full-width'); // . is used to select by class name

    // by Attribute Name
    cy.get('[placeholder]'); //

    // by Attribute Name and Value
    cy.get('[placeholder="Email"]'); //

    // by Class Value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    // by Tag Name and Attribute with Value
    cy.get('input[placeholder="Email"]');

    // by different attributes
    cy.get('[placeholder="Email"][fullwidth][type="email"]');

    // by Tag Name, Attribute with Value, ID and Class Name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width'); // without spaces

    // the most recommended way by Cypress
    cy.get('[data-cy="imputEmail1"]'); // data-cy is a custom attribute
    // own locators are the best way to select elements
    // nobody will touch them
  });

  it('second test', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();
    cy.get("[data-cy='signInButton']");
    cy.contains("[status='warning']", 'Sign in'); // using CSS selector

    // how to travel through the DOM:
    cy.get('#inputEmail3') // get() is used to search elements in the entire DOM
      .parents('form') // parents() is used to travel up the DOM
      .find('button') // find() is used to find child elements inside parent elements
      .should('contain', 'Sign in') // should() is used to make assertions
      .parents('form')
      .find('nb-checkbox')
      .click();

    cy.contains('nb-card', 'Horizontal form').find('[type="email"]');
  });

  it('then and wrap methods', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email'); // cypress Method Chaining!
    cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password');
    cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address');
    cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password');

    // selenium style:
    // const firstForm = cy.contains('nb-card', 'Using the Grid');
    // const secondForm = cy.contains('nb-card', 'Basic form');
    // firstForm.find('[for="inputEmail1"]').should('contain', 'Email');
    // --> not work, because Cypress commands are asynchronous!!!
    // --> Cypress commands return a promise, not the element itself

    cy.contains('nb-card', 'Using the Grid').then((firstForm) => {
      // save the context to the jQuery object firstForm, to use it later
      const emailLabelFirstForm = firstForm.find('[for="inputEmail1"]').text(); // JQuery method!
      const passwordLabelFirstForm = firstForm.find('[for="inputPassword2"]').text();
      expect(emailLabelFirstForm).to.equal('Email'); // Chai assertion!
      expect(passwordLabelFirstForm).to.equal('Password');

      cy.contains('nb-card', 'Basic form').then((secondForm) => {
        const passwordLabelSecondForm = secondForm.find('[for="exampleInputPassword1"]').text();
        expect(passwordLabelFirstForm).to.equal(passwordLabelSecondForm);
        // passwordLabelFirstForm is visible in this scope

        cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password'); // wrap() is used to wrap the jQuery object to a Cypress object --> to use Cypress commands
      });
    });
  });

  it('invoke command', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();
    // three ways to work with text
    // 1
    cy.get('[for="exampleInputEmail1"]')
      .should('contain', 'Email address')
      .should('have.class', 'label')
      .and('have.text', 'Email address');

    // 2
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      expect(label.text()).to.equal('Email address');
      expect(label).to.have.class('label');
      expect(label).to.have.text('Email address');
    });
    // 3
    cy.get('[for="exampleInputEmail1"]')
      .invoke('text')
      .then((text) => {
        expect(text).to.equal('Email address');
      });

    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      //.should('contain', 'checked');
      .then((classValue) => {
        expect(classValue).to.contain('checked');
      });
  });

  it.only('invoke command - assert property', () => {
    function selectDayFromCurrent(day) {
      let date = new Date();
      date.setDate(date.getDate() + day);
      let futureDay = date.getDate();
      let futureMonth = date.toLocaleString('en-US', { month: 'short' });
      let futureYear = date.getFullYear();

      let expectedDateConcatination = futureMonth + ' ' + futureDay + ', ' + futureYear;
      console.log('The expected date using string concatination: ' + expectedDateConcatination);
      let expectedDateInterpolation = `${futureMonth} ${futureDay}, ${futureYear}`;
      console.log('The expected date using string interpolation: ' + expectedDateInterpolation);

      cy.get('nb-calendar-navigation')
        .invoke('attr', 'ng-reflect-date')
        .then((dateAttribute) => {
          if (!dateAttribute.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrent(day);
          } else {
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click();
          }
        });
      return expectedDateConcatination;
    }

    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();
    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then((input) => {
        cy.wrap(input).click();
        let dateAssert = selectDayFromCurrent(300);
        cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert);
        cy.wrap(input).should('have.value', dateAssert);
      });
  });

  it('radio button', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();
    cy.contains('nb-card', 'Using the Grid')
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons).first().check({ force: true }).should('be.checked');
        // force: true --> because radioButtons not visible (class="native-input visually-hidden")
        cy.wrap(radioButtons).eq(1).check({ force: true });
        cy.wrap(radioButtons).eq(0).should('not.be.checked');
        cy.wrap(radioButtons).eq(2).should('be.disabled');
      });
  });

  it('check boxes', () => {
    cy.visit('/');
    cy.contains('Modal & Overlays').click();
    cy.contains('Toastr').click();
    cy.get('[type="checkbox"]').check({ force: true });
    // if checkbox is allready checked, the check() command will not uncheck the checkbox
    // in order to uncheck the checkbox, we have to use the click() command
    cy.get('[type="checkbox"]').first().click({ force: true });
  });

  it('lists and dropdowns', () => {
    cy.visit('/');
    //1
    // cy.get('nav nb-select').click(); // the list of select options is not visible in the DOM before we click on the dropdown
    // cy.get('.options-list').contains('Dark').click();
    // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)');
    // cy.get('nav nb-select').should('contain', 'Dark');

    //2
    cy.get('nav nb-select').then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get('.options-list nb-option').each((listItem, index) => {
        const itemText = listItem.text().trim();

        const colors = {
          Light: 'rgb(255, 255, 255)',
          Dark: 'rgb(34, 43, 69)',
          Cosmic: 'rgb(50, 50, 89)',
          Corporate: 'rgb(255, 255, 255)',
        };

        cy.wrap(listItem).click();
        cy.wrap(dropdown).should('contain', itemText);
        cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText]);
        if (index < 3) {
          cy.wrap(dropdown).click();
        }
      });
    });

    // 3
    // better use select() command (https://docs.cypress.io/api/commands/select)
    // precondition: the dropdown HTML Tag must be <select> and not <nb-select>
    // Then we can use the value attribute to select the dropdown item
    // more stable than to use the displayed text (different languages, etc.)
    // cy.get('select').select('dark')
  });

  it('web tables', () => {
    cy.visit('/');
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();
    //1 change existing value
    cy.get('tbody')
      .contains('tr', 'Larry')
      .then((tableRow) => {
        cy.wrap(tableRow).find('.nb-edit').click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25');
        cy.wrap(tableRow).find('.nb-checkmark').click();
        cy.wrap(tableRow).find('td').eq(6).should('contain', '25');
      });
    //2 add new line
    cy.get('thead').find('.nb-plus').click();
    cy.get('thead')
      .find('tr')
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type('Max');
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Mustermann');
        cy.wrap(tableRow).find('.nb-checkmark').click();
      });
    cy.get('tbody tr')
      .first()
      .find('td')
      .then((tableColumns) => {
        cy.wrap(tableColumns).eq(2).should('contain', 'Max');
        cy.wrap(tableColumns).eq(3).should('contain', 'Mustermann');
      });

    //3 - use filter
    const age = [20, 30, 40, 200];
    cy.wrap(age).each((age) => {
      cy.get('thead [placeholder="Age"]').clear().type(age);
      cy.wait(500); // time is needed for filter data
      cy.get('tbody tr').each((tableRow) => {
        if (age == 200) {
          cy.wrap(tableRow).should('contain', 'No data found');
        } else {
          cy.wrap(tableRow).find('td').eq(6).should('contain', age);
        }
      });
    });
  });

  it('tooltop', () => {
    cy.visit('/');
    cy.contains('Modal & Overlays').click();
    cy.contains('Tooltip').click();
    cy.contains('nb-card', 'Colored Tooltips').contains('Default').click();
    cy.get('nb-tooltip').should('contain', 'This is a tooltip');
  });

  it('dialog box', () => {
    // special because it is a native browser dialog box (not HTML)
    cy.visit('/');
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();

    //1 - use window:confirm event (not recommended)
    // cy.get('tbody tr').first().find('.nb-trash').click();
    // cy.on('window:confirm', (confirm) => {
    //   // Problem: if the event is not triggered, the next code will not be executed
    //   expect(confirm).to.equal('Are you sure you want to delete?');
    // });

    //2 - use stub (better solution)
    // const stub = cy.stub();
    // cy.on('window:confirm', stub);
    // cy.get('tbody tr')
    //   .first()
    //   .find('.nb-trash')
    //   .click()
    //   .then(() => {
    //     expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?');
    //   });

    //3 how to select cancel button for the dialog box
    cy.get('tbody tr').first().find('.nb-trash').click();
    cy.on('window:confirm', () => false);
  });

  it('assert property', () => {
    // https://docs.cypress.io/guides/references/assertions
  });
});
