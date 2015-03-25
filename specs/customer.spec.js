describe('Customer', function() {

  var customer;

  beforeEach(function() {
    customer = new Customer('iheartbeer@drunk.com','Jdsjsd3732jsSD73sdf','Alex');
  });


  it('Has an email address', function() {
    expect(customer.email).toEqual('iheartbeer@drunk.com');
  });

  it('Has a name', function() {
    expect(customer.name).toEqual('Alex');
  });



});
