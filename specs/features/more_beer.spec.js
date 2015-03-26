describe('Ordering Beer', function() {
var mongojs = require('mongojs');
var db = mongojs(('beer-testing'), ['customers', 'bars', 'menus']);

  beforeAll(function() {
    browser.get('http://localhost:3000');
    var email = element(by.id('email-sign-up'));
    var password = element(by.id('password-sign-up'));
    var submit = element(by.id('sign-up-submit'));
    email.sendKeys('beer@drinker.com');
    password.sendKeys('123456');
    submit.click();

  });

  afterAll(function() {
    db.customers.remove({});
  });

  beforeEach(function() {});



});