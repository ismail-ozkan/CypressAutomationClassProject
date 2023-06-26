export class NavigateTo{
    loginPage(){
        cy.visit('login page of cydeo');
    }
}

export const navigateTo = new NavigateTo();