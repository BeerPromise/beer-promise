describe('Golden Ticket', function(){
  describe('index', function(){
    it('should have a title', function(){
      browser.get('/')
      expect(browser.getTitle()).toEqual('Beer Promise')
    });
  });
});