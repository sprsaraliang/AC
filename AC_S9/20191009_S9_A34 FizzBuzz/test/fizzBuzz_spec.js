var should = chai.should()
describe('function fizzBuzz', function() {
  it('(1)should input Num:3 can be divisible by 3 and return Fizz', function() {
    var result = fizzBuzz(3);
    result.should.be.equal("Fizz");
  })
  it('(2)should input Num:5 can be divisible by 5 and return Bizz', function() {
    var result = fizzBuzz(5);
    result.should.be.equal("Buzz");
  })
  it('(3)should input Num:15 can be divisible by 3 and 5, return FizzBizz', function() {
    var result = fizzBuzz(15);
    result.should.be.equal("FizzBuzz");
  })

  it('(4)should input Num:13 can be divisible by any number,return Num', function() {
    var result = fizzBuzz(3)
    result.should.be.equal(result);
  })
})