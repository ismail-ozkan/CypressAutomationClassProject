describe('Find or Get Elements by Using Different Locators', () => {
    beforeEach(() => {
        // runs before each test cases(it), like @beforeMethod in TestNG
        cy.clearCookies();
        cy.visit('/login');
    })
    it('Check different locators strategies', () => {
        // By CSS Locator
        cy.get("input[name='username']").type("CydeoStudent");// every statement creates 
        //an object to be interacted, and next command makes operation to 
        //the object created at the previous statement

        // attribute name and value
        cy.get("[type='text']").clear(); // clear what is typed

        // multiple element
        cy.get("input").each((item, index, list) => {
            // assert that the length of list is 2
            expect(list).to.have.length(2);
            expect(item).to.have.attr("type");
        })
    })
})