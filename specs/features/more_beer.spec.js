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

  it('can increment beers', function(){
    var increment = element(by.css('#increment'));
    var ins = element(by.css('ins'));
    increment.click();
    expect(ins.getText()).toContain('1');    
  });

  it('can decrement beers', function(){
    var decrement = element(by.css('#decrement'));
    var ins = element(by.css('ins'));  
    decrement.click()
    expect(ins.getText()).toContain('0');      
  });

});