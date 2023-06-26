/// <reference types="cypress" />

describe('Cypress Web Table Tests', { baseUrl: 'https://demoqa.com' }, () => {
  /**
   * If you need to navigate to a URL other than your baseUrl, you define it at describe block or in the it block
   */
  beforeEach('Navigate to webtable page in demoqa.com', () => {
    cy.clearCookies();
    cy.visit('/webtables');
  });

  xit('Check finding and editing a record', () => {
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
  xit('Check finding and deleting a record', () => {
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
  xit('Check search for different age records', () => {
    // define age groups
    const ageGroup = [29, 39, 45, 77];
    // for each age group perform same test scenario
    cy.wrap(ageGroup).each((age) => {
      // type age into search box
      cy.get('#searchBox').clear().type(age);
      // we will verify firstly if that age exists, and second one is number of records
      if (age === 77) {
        // negative scenario
        cy.get('.rt-tbody').find('.rt-tr-group').first().should('not.contain', age);
        cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');
      } else {
        // positive scenario
        // we will verify firstly if that age exists, and second one is number of records
        cy.get('.rt-tbody').find('.rt-tr-group').first().should('contain', age);
        cy.get('.rt-tbody').contains('.rt-tr-group', age).should('have.length', 1);
      }
    });
  });
  xit('Check search for different age records', () => {
    // define age groups
    const ageGroup = [29, 39, 45, 77];
    // for each age group perform same test scenario
    cy.wrap(ageGroup).each((age) => {
      // type age into search box
      cy.get('#searchBox').clear().type(age);
      // we will verify firstly if that age exists, and second one is number of records
      if (age === 77) {
        // negative scenario
        cy.get('.rt-tbody').find('.rt-tr-group').first().should('not.contain', age);
        cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');
      } else {
        // positive scenario
        // we will verify firstly if that age exists, and second one is number of records
        cy.get('.rt-tbody').find('.rt-tr-group').first().should('contain', age);
        cy.get('.rt-tbody').contains('.rt-tr-group', age).should('have.length', 1);
      }
    });
  });
  xit('Check adding a new record - Bad code practice', () => {
    //click on add button
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type('Harvey');
    cy.get('#lastName').type('Kandy');
    cy.get('#userEmail').type('harvey@gmail.com');
    cy.get('#age').type('40');
    cy.get('#salary').type('70000');
    cy.get('#department').type('Legal');
    cy.get('#submit').click();
    // assert that new record is added
    cy.get('.rt-tbody') // get me table body
      .contains('.rt-tr-group', 'Harvey') // get me the row that contains Harvey
      .then((row) => {
        cy.wrap(row).find('.rt-td').eq(0).should('contain', 'Harvey');
        cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Kandy');
        cy.wrap(row).find('.rt-td').eq(2).should('contain', '40');
        cy.wrap(row).find('.rt-td').eq(3).should('contain', 'harvey@gmail.com');
        cy.wrap(row).find('.rt-td').eq(4).should('contain', '70000');
        cy.wrap(row).find('.rt-td').eq(5).should('contain', 'Legal');
      });
    });
  it('Check adding a new record - Better approach', () => {
    //click on add button
    cy.get('#addNewRecordButton').click();
    cy.fixture('users').then((users) => {
      const columnNames = Object.keys(users.user1); // goes to fixture folder, gets users file and
      // get user1 object keys and store into columnNames array
      const userData = Object.values(users.user1);
      cy.wrap(columnNames).each((columnName, index) => {
        //cy.log(columnName);
        //cy.log(userData[index]);
        cy.get(`#${columnName}`).type(userData[index]);
      })
      cy.get('#submit').click();
      cy.get('.rt-tbody') // get me table body
      .contains('.rt-tr-group', userData[0]) // get me the row that contains user firstName
      .then((row) => {
        cy.wrap(userData).each((value, index) => {
          cy.wrap(row).find('.rt-td').eq(index).should('contain',value);
        })
      });
    })
  })
});
