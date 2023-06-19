/// <reference types="cypress" />

describe('Context: My First Tests with Cypress', () => {
    before(() => {
        // runs once before all test cases in this describe block, like @beforeClass in TestNG
    })
    beforeEach(() => {
        // runs before each test cases(it), like @beforeMethod in TestNG
        cy.clearCookies();
    })
    after(() => {
        // similar to affect afterClass in TestNG, runs once after all tests finished
    })
    afterEach(() => {
        // runs after each test cases(it), like @afterMethod in TestNG
    })
    it('Opening a web application', () => {
        //cy.visit('https://practice.cydeo.com');
        //cy.get('.list-group > :nth-child(1) > table').click();
    })
    it('Opening a tab in the web application with BaseUrl', () => {
        cy.visit('/registration_form');
    })
})