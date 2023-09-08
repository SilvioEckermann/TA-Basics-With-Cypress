/// <reference types="cypress" />

import { navigateTo } from '../support/page_objects/navigationPage';
import { onFormLayoutsPage } from '../support/page_objects/formLayoutsPage';
import { onDatepickerPage } from '../support/page_objects/datepickerPage';
import { onSmartTablePage } from '../support/page_objects/smartTablePage';

describe('Test with Page Objects', () => {
  beforeEach('open application', () => {
    cy.openHomePage();
  });

  it('verify the Navigation across the pages', () => {
    navigateTo.formLayoutsPage();
    navigateTo.datePickerPage();
    navigateTo.smartTablePage();
    navigateTo.toasterPage();
    navigateTo.tooltipPage();
  });

  it.only('should submit Inline and Basic form and select tomorrow date in the calendar', () => {
    navigateTo.formLayoutsPage();
    onFormLayoutsPage.submitInlineFormWithNameAndEmail('Max Mustermann', 'MM@mars.com', true);
    onFormLayoutsPage.submitBasicFormWithNameAndEmail('MM@mars.com', 'MM4-452-@ER-345>>#', true);
    navigateTo.datePickerPage();
    onDatepickerPage.selectCommonDatepickerDateFromToday(1);
    onDatepickerPage.selectCommonDatepickerWithRangeFromToday(1, 3);
    navigateTo.smartTablePage();
    onSmartTablePage.updateAgeByFirstName('Larry', 42);
    onSmartTablePage.addNewRecordWithFirstAndLastName('Helga', 'Hofer');
    onSmartTablePage.deleteRowByIndex(2);
  });
});
