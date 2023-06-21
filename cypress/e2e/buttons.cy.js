/// <reference types="cypress" />

describe('Context: Multiple Button Actions', () => {
  beforeEach(() => {
    // runs before each test cases(it), like @beforeMethod in TestNG
    cy.clearCookies();
    cy.visit('/multiple_buttons');
  });

  it('Check Different Button Actions', () => {
    // select a button with text
    cy.contains('Button 2').should('be.visible').click();
    cy.contains('Clicked on button two!').should('be.visible');

    // find element with class attribute and create a list then
    // select 3rd element from the list

    cy.get('.btn.btn-primary').then(($buttons) => {
      for (let i = 0; i < 5; i++) {
        cy.wrap($buttons).eq(i).click();
        // assert the text
        var number;
        switch (i) {
          case 0:
            number = 'one';
            break;
          case 1:
            number = 'two';
            break;
          case 2:
            number = 'three';
            break;
          case 3:
            number = 'four';
            break;
          case 4:
            number = 'five';
            break;
        }
        cy.contains(`Clicked on button ${number}`).should('be.visible');
      }
    });
    // you got all buttons with tagName; each method is creating me a loop
    cy.get('button').each((item, index, list) => {
      // assert length of the list, verify number of buttons
      expect(list).to.have.length(6);
      expect(item).to.have.attr('onclick');
    });
    // I will get all buttons like previous approach, get only the item then
    // check fo text of each item, if equal to Button, then click on it
    cy.get('button').each((item) => {
      if (item.text() == 'Button 4') {
        cy.log(item.text()); // this command write the text at the test console
        item.click(); // we cannot use cypress click func on jQuery Element
        cy.wrap(item).click();
        cy.contains('Clicked on button four!').should('be.visible');
      }
    });
  });

  // npx cypress run --headless -b chrome
});
