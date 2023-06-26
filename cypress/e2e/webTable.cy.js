/// <reference types="cypress" />

describe('Cypress Web Table Tests', { baseUrl: 'https://demoqa.com' }, () => {
  /**
   * If you need to navigate to a URL other than your baseUrl, you define it at describe block or in the it block
   */
  beforeEach('Navigate to webtable page in demoqa.com', () => {
    cy.clearCookies();
    cy.visit('/webtables');
  });

  it('Check finding and editing a record', () => {
    // locate table body then navigate through this element to find
    // Alden, then update info with another person
    cy.get('.rt-tbody') // get me table body
      .contains('.rt-tr-group', 'Alden') // get me the row that contains Alden
      .then((row) => {
        // store it into a Jquery element
        // click on the edit button
        cy.wrap(row).find('[title="Edit"]').click();
        // fill in the boxes with new person info
        cy.get('#firstName').clear().type('ismail');
        cy.get('#lastName').clear().type('ozcan');
        cy.get('#userEmail').clear().type('ismailozcn@gmail.com');
        cy.get('#submit').click();
        // from cypress test perspective we are still inside row element : need to do assertion
        cy.wrap(row).find('.rt-td').eq(0).should('contain', 'ismail');
        cy.wrap(row).find('.rt-td').eq(1).should('contain', 'ozcan');
        cy.wrap(row).find('.rt-td').eq(3).should('contain', 'ismailozcn@gmail.com');
      });
  });
  it('Check finding and deleting a record', () => {
    cy.get('.rt-tbody') // get me table body
      .contains('.rt-tr-group', 'Alden') // get me the row that contains Alden
      .then((row) => {
        // store it into a Jquery element
        // click on the delete button
        cy.wrap(row).find('[title="Delete"]').click();
      });
    // Assert that table does not have Alden record
    cy.get('.rt-tbody').should('not.contain', 'Alden');
    // Assert that after searching Alden in the table we should not find it anymore
    cy.get('#searchBox').type('Alden');
    // No row found message is visible
    cy.get('.rt-noData').should('be.visible').should('contain', 'No rows found');
  });
});
