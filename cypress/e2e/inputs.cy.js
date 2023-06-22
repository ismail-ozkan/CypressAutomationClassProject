/// <reference types="cypress" />

describe('Input Forms Tests', () => {
  beforeEach('Navigate to registration page', () => {
    cy.clearCookies();
    cy.visit('/registration_form');
  });

  it('Opening a web application', () => {
    // cy.visit('https://practice.cydeo.com');
    // cy.get('.list-group > :nth-child(1) > table').click();
  });
  it('Check different input box fields and verify', () => {
    // fill the form for username
    cy.get('input[name="firstname"]').type('Mike');
    cy.get('input[name="lastname"]').type('Brown');
    cy.get('input[name="username"]').type('crazyHeart');
    /**
     * Math.random(): creates a number between 0- 1
     * Math.floor(): make it a whole number
     */
    const email = `formtest${Math.floor(10000 + Math.random() * 900000)}@cydeo.com`;
    cy.get('input[name="email"]').type(email);
    const password = `formtest${Math.floor(10000 + Math.random() * 900000)}`;
    cy.get('input[name="password"]').type(password);
    const phone = `555-000-${Math.floor(1000 + Math.random() * 9000)}`;
    cy.get('input[name="phone"]').type(phone);
    cy.get('input[name="birthday"]').type('01/01/1991');
  });
});
