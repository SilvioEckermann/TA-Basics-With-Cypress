export class FormLayoutsPage {
  submitInlineFormWithNameAndEmail(name, email, rememberMe) {
    cy.contains('nb-card', 'Inline form')
      .find('form')
      .then((form) => {
        cy.wrap(form).find('Input').first().type(name);
        cy.wrap(form).find('Input').eq(1).type(email);
        if (rememberMe) {
          // cy.wrap(inlineForm).find('nb-checkbox').click();
          cy.wrap(form).find('[type="checkbox"]').check({ force: true });
        }
        //   cy.wrap(form).find('button').contains('Submit').click();
        cy.wrap(form).submit();
      });
  }

  submitBasicFormWithNameAndEmail(name, email, checkMeOut) {
    cy.contains('nb-card', 'Basic form')
      .find('form')
      .then((form) => {
        cy.wrap(form).find('#exampleInputEmail1').type(name);
        cy.wrap(form).find('#exampleInputPassword1').type(email);
        if (checkMeOut) {
          // cy.wrap(inlineForm).find('nb-checkbox').click();
          cy.wrap(form).find('[type="checkbox"]').check({ force: true });
        }
        //   cy.wrap(form).find('button').contains('Submit').click();
        cy.wrap(form).submit();
      });
  }
}

export const onFormLayoutsPage = new FormLayoutsPage();
