describe('User Management', function() {
var mongojs = require('mongojs');
var db = mongojs(('beer-testing'), ['customers', 'bars', 'menus']);

  afterAll(function() {
    db.customers.remove({});
  });

  beforeEach(function(){
    browser.get('http://localhost:3000');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Beer Promise');
  });

  it('can create a user', function(){
    var email = element(by.id('email-sign-up'));
    var password = element(by.id('password-sign-up'));
    var submit = element(by.id('sign-up-submit'));
    email.sendKeys('test@makers.com');
    password.sendKeys('123456');
    submit.click();
    expect(element(by.id('welcome')).getText()).toContain('welcome, test@makers.com');
  });

  it('A user can sign out', function() {
    var signOut = element(by.css("a[href='/signout']"));
    signOut.click();
    expect(element(by.css("form[action='/createcustomer'] legend")).getText()).toContain('Sign Up!');
  });

  it('can sign in a user', function(){
    var email = element(by.id('email-sign-in'));
    var password = element(by.id('password-sign-in'));
    var submit = element(by.id('sign-in-submit'));
    email.sendKeys('test@makers.com');
    password.sendKeys('123456');
    submit.click();
    expect(element(by.id('welcome')).getText()).toContain('welcome, test@makers.com');
  });























});
