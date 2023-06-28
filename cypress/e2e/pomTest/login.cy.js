import { auth } from '../../support/pages/auth';
import { navigateTo } from '../../support/pages/navigation';

const LoginLocators = require('../../support/pages/auth');// it's like a static element, we can access all things in the class in this way

describe('Auth: Login User with Different Ways', () => {
  // navigation to the test page
  beforeEach('Navigate to login page', () => {
    cy.clearAllCookies();
    navigateTo.loginPage(); // this method we called it from our POM
  });

  it('Happy path scenario using POM FUNCTION', () => {
    // auth.login("hard coding username", "hard coding password"); --> this is not a good way
    cy.fixture('users').then((users) => {
      auth.login(users.user2.username, users.user2.password);
    });
    // let's call our custom command to verify the text
    cy.textExists('You logged into a secure area!');
    auth.logout();
  });
  it('Happy path scenario using POM LOCATORS', () => {
    // auth.login("hard coding username", "hard coding password"); --> this is not a good way
    cy.fixture('users').then((users) => {
      //auth.login(users.user2.username, users.user2.password);
      // I need to import locators object
      LoginLocators.locators.userName.type(users.user2.username);
      LoginLocators.locators.password.type(users.user2.password);
      LoginLocators.locators.submit.click();
    });
    // let's call our custom command to verify the text
    cy.textExists('You logged into a secure area!');
    auth.logout();
  });

  it('Happy path scenario using POM but NOT LOCATORS with auth import', () => {
    // auth.login("hard coding username", "hard coding password"); --> this is not a good way
    cy.fixture('users').then((users) => {
      auth.loginWithLocatorsUsingValidCredentials();
    });
    // let's call our custom command to verify the text
    cy.textExists('You logged into a secure area!');
    auth.logout();
  });
  it('Check invalid user credentials', () => {
    auth.login("invalidUserName123", "invalidPassword123");
    cy.textExists('Your username is invalid!');
  });
});
