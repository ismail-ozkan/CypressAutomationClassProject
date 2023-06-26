/// <reference types="cypress" />

describe('Cypress File Upload Tests', () => {
  /**
   * Step 1:
   * In order to upload files in Cypress we need to install plugin
   * we will run following command:
   * npm install -dev cypress-file-upload
   * Step 2:
   * we need to import necessary command to our project
   * in our support folder we have commands.js file: this file is a good place for putting our utility methods (functions)
   * add following line:
   * import 'cypress-file-upload';
   * Step 3:
   * The file that you want to upload should be in your fixture folder
   */
  beforeEach('Navigate to upload page', () => {
    cy.clearCookies();
    cy.visit('/upload');
  });

  it('Check Upload Actions', () => {
    // locator for choose file
    // using name
    // cy.get('input[name="file"]');
    // using id
    cy.get('input#file-upload').attachFile('if assign a bug.txt');
    // click on upload button
    cy.get('input#file-submit').click();
    // assert that path message is displayed
    cy.get('div#uploaded-files').then(() => {
      // that is the CORRECT way to assert this type of things
      cy.contains('if assign a bug.txt').should('be.visible');
    });
  });
});
