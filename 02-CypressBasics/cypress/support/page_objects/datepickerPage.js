function selectDayFromCurrent(day) {
  let date = new Date();
  date.setDate(date.getDate() + day);
  let futureDay = date.getDate();
  let futureMonth = date.toLocaleString('en-US', { month: 'short' });
  let futureYear = date.getFullYear();
  let expectedDateConcatination = futureMonth + ' ' + futureDay + ', ' + futureYear;
  cy.get('nb-calendar-navigation')
    .invoke('attr', 'ng-reflect-date')
    .then((dateAttribute) => {
      if (!dateAttribute.includes(futureMonth)) {
        cy.get('[data-name="chevron-right"]').click();
        selectDayFromCurrent(day);
      } else {
        cy.get('.day-cell').not('.bounding-month').contains(futureDay).click();
      }
    });
  return expectedDateConcatination;
}

export class DatepickerPage {
  selectCommonDatepickerDateFromToday(dayFromToday) {
    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then((input) => {
        cy.wrap(input).click();
        let dateAssert = selectDayFromCurrent(dayFromToday);
        cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert);
        cy.wrap(input).should('have.value', dateAssert);
      });
  }

  selectCommonDatepickerWithRangeFromToday(firstDay, secondDay) {
    cy.contains('nb-card', 'Datepicker With Range')
      .find('input')
      .then((input) => {
        cy.wrap(input).click();
        let dateAssertFirst = selectDayFromCurrent(firstDay);
        let dateAssertSecond = selectDayFromCurrent(secondDay);
        const finalDate = dateAssertFirst + ' - ' + dateAssertSecond;
        cy.wrap(input).invoke('prop', 'value').should('contain', finalDate);
        cy.wrap(input).should('have.value', finalDate);
      });
  }
}

export const onDatepickerPage = new DatepickerPage();
