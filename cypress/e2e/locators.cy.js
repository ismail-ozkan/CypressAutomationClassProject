/// <reference types="cypress" />

describe('Find or Get Elements by Using Different Locators', () => {
  beforeEach(() => {
    // runs before each test cases(it), like @beforeMethod in TestNG
    cy.clearCookies();
    cy.visit('/login');
  });

  it('Check different locators strategies', () => {
    // By CSS Locator
    cy.get("input[name='username']").type('CydeoStudent'); // every statement creates
    // an object to be interacted, and next command makes operation to
    // the object created at the previous statement

    // attribute name and value
    cy.get("[type='text']").clear(); // clear what is typed

    // tagName
    // multiple element
    cy.get('input').each((item, index, list) => {
      // assert that the length of list is 2
      expect(list).to.have.length(2);
      expect(item).to.have.attr('type');
    });

    // by attributeName
    cy.get('[type]');

    // by className
    cy.get('.btn.btn-primary');

    // by id
    cy.get('#wooden_spoon');

    // if I want to use text: no xpath in cypress, but it still possible with
    // a different approach
    cy.get('button').should('contain', 'Login').click();
  });

  it('Check finding element by traveling through DOM', () => {
    // travel to find the login button: locate username box
    // go to parent form then find button
    cy.get('input[name="username"')
      .parents('form')
      .find('button')
      .should('contain', 'Login')
      .click();
  });

  it.only('Check Different Type of Assertions', () => {
    // Cypress itself bundles assetions provided by Chai, Sinon, jQuery libraries
    // Should Assertion: does the assertion directly on the object itself
    cy.get('#wooden_spoon').should('contain', 'Login').and('have.class', 'btn btn-primary');
    // expect assertion: creates a subject of our test, then you implement
    // different actions
    cy.get('#wooden_spoon').then((buttonElement) => {
      expect(buttonElement).to.have.text('Login');
      expect(buttonElement).to.have.class('btn btn-primary');
    });
  });
});
