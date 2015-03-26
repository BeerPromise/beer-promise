describe('Ordering Beer', function() {
var mongojs = require('mongojs');
var db = mongojs(('beer-testing'), ['customers', 'bars', 'menus']);

  beforeAll(function() {
    browser.get('http://localhost:3000');
    var email = element(by.id('email-sign-up'));
    var password = element(by.id('password-sign-up'));
    var submit = element(by.id('sign-up-submit'));
    email.sendKeys('tester@drunk.com');
    password.sendKeys('123456');
    submit.click();
    console.log('Tester has signed up!');
  });

  afterAll(function() {
    db.customers.remove({});
    browser.get('http://localhost:3000');
    var signOut = element(by.css("a[href='/signout']"));
    signOut.click();
  });

  beforeEach(function() {
    browser.get("http://localhost:3000");
  });

  it('can increment beers', function(){
    var increment = element(by.id('increment'));
    var ins = element(by.css('ins'));
    increment.click();
    expect(ins.getText()).toContain('1');
  });

  it('can decrement beers', function(){
    var decrement = element(by.id('decrement'));
    var increment = element(by.id('increment'));
    var ins = element(by.css('ins'));
    increment.click();
    decrement.click();
    expect(ins.getText()).toContain('0');
   });

});
