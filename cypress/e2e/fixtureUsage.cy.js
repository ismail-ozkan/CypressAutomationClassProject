/// <reference types="Cypress" />

describe('Second Framework Test Suite', () => {

    before(function () {
        cy.fixture('user').then(function (data) {
           this.data=data;
        })  
    })

    it('fixture usage test', function() {
        cy.visit('inputs');
    
        cy.get('input').type(this.data.name);
        
        
        
    })
})