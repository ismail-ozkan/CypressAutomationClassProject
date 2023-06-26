/// <reference types="cypress" />

describe('Input Forms Tests', () => {
  beforeEach('Navigate to registration page', () => {
    cy.clearCookies();
    cy.visit('/registration_form');
  });

  it.skip('Opening a web application', () => {
    // cy.visit('https://practice.cydeo.com');
    // cy.get('.list-group > :nth-child(1) > table').click();
  });
  it.skip('Check different input box fields and verify', () => {
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

  it.skip('Check different radio button actions', () => {
    cy.get('.radio')
      .find('[type=radio]')
      .then((radio) => {
        // get all radio buttons, select the first and verify that it is checked
        cy.wrap(radio).first().check().should('be.checked');
        /*
it(('Check different radio button actions'), ()=> {: Bu satır, bir test senaryosunun başlangıcını gösterir. "Check different radio button actions" başlığı altında bir test senaryosu tanımlanır.
cy.get('.radio'): Bu satır, Cypress'in .get() komutunu kullanarak .radio sınıfına sahip bir öğeyi seçer. Bu, radio düğmelerinin bir grup içinde olduğunu varsayar.
.find('[tpye=radio]'): Bu satır, .get() komutunun döndürdüğü öğenin içinde, tpye=radio özniteliğine sahip olan tüm öğeleri seçer. Muhtemelen burada bir yazım hatası olmuş, çünkü özelliğin type olması gerekiyor (type=radio).
.then((radio) => {: Bu satır, önceki .find() işlevi sonucunu bir parametre olarak alarak bir işlevi zincirler. Bu işlev, seçilen tüm radyo düğmelerini temsil eden radio parametresine erişim sağlar.
cy.wrap(radio): Bu satır, radio parametresini bir Cypress nesnesine sarmalar. Böylece, sonraki Cypress komutlarını bu nesne üzerinde zincirleme şeklinde çalıştırabiliriz.
.first(): Bu satır, radio öğeleri arasından ilkini seçer. İlk radyo düğmesini temsil eden bir Cypress nesnesi döndürür.
.check(): Bu satır, seçilen radyo düğmesini işaretler. Yani, radyo düğmesini seçili hale getirir.
.should('be.checked'): Bu satır, seçilen radyo düğmesinin işaretli olduğunu doğrular. Eğer radyo düğmesi işaretli değilse, bu ifade hata verecektir.
*/
        /**
         * radio: is Jquery element, cy.wrap(radio) : turns in into Cypress Object so that I can use cypress functions
         * first() : select first element
         * check() : checks it out
         * should : verifies whatever I provide as parameter 'be.checked'
         */
        // get all radio buttons, select the second and verify that it is checked and confirmation label is visible
        cy.wrap(radio).eq(1).check().should('be.checked');
        cy.get('[data-bv-icon-for="gender"]').should('be.visible'); // common function used in tests
        // Check the third is NOT checked
        cy.wrap(radio).eq(2).should('not.be.checked');
      });
  });

  it('Check different checkbox actions', () => {
    // get all checkboxes, select JAVA and Verify
    cy.get('[type="checkbox"]').then((checkbox) => {
      cy.wrap(checkbox).eq(1).check().should('be.checked');
      // uncheck JAVA
      cy.wrap(checkbox).eq(1).uncheck().should('not.be.checked');
      // verify third one has a value Javascript and then check and verify
      cy.wrap(checkbox).eq(2).should('have.value', 'javascript').check().should('be.checked');
    });
  });
  it('Check selection of a single choise from dropdown', () => {
    // select one element
    cy.get('select[name="job_title"]').select('SDET');
    // assert that dropdown has correct text after selecting
    cy.get('select[name="job_title"]').contains('SDET');
  });
  it('Check selection of all dropdowns options', () => {
    // we will provide our test data through fixtures folder as JSON object,
    // then use that data to verify select values
    cy.fixture('departments').then((departments) => {
      // Get all options in the menu, iterate through these options one by one
      cy.get('select[name="department"] > option').each((option, index) => {
        // get each option text
        const optionText = option.text();
        // cy.log(optionText);
        // cy.log(index);
        // cy.log(departments[index]);
        cy.get('select[name="department"]')
          .select(optionText)
          .should('have.value', option.val())
          .contains(departments[index]);
      });
    });
  });
});
