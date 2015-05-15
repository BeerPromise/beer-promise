describe('Golden Ticket', function(){
  describe('index', function(){
    it('should have a title', function(){
      browser.get('/');
      expect(browser.getTitle()).toEqual('Beer Promise');
    });
    it('index page should say hello world', function(){
      browser.get('/');
      text = element(by.css('h1'));
      expect(text.getText()).toEqual('Hello World');
    });
    it('error page displays text as required', function(){
      browser.get('/no-page');
      text = element(by.css('p'));
      expect(text.getText()).toEqual('404');
    });
  });
});