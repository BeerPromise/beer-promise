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























});