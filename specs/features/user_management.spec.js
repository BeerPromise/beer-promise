describe('User Management', function() {
var mongojs = require('mongojs');
var db = mongojs(('beer-testing'), ['customers', 'bars', 'menus']);

  afterAll(function() {
    db.customers.remove({});
  });


  it('should have a title', function() {
    browser.get('http://localhost:3000');
    expect(browser.getTitle()).toEqual('Beer Promise');
  });

  it('can create a user', function(){
    browser.get('http://localhost:3000');
    var email = element(by.id('email-sign-up'));
    var password = element(by.id('password-sign-up'));
    var submit = element(by.id('sign-up-submit'));
    email.sendKeys('test@makers.com');
    password.sendKeys('123456');
    submit.click();
    expect(element(by.id('welcome')).getText()).toContain('welcome, test@makers.com');
  });























});