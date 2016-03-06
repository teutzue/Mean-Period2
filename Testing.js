/**
 * Created by CosticaTeodor on 06/03/16.
 */


//4.Explain, using relevant examples, concepts related to the testing a REST-API using Node/JavaScript + relevant packages

/*
What is ReST first?

 REST is the underlying architectural principle of the web. The amazing thing about the web is the fact that clients (browsers)
 and servers can interact in complex ways without the client knowing anything beforehand about the server and the resources it
 hosts. The key constraint is that the server and client must both agree on the media used, which in the case of the web is HTML.

 HTTP is oriented around verbs and resources. The two verbs in mainstream usage are GET and POST, which I think everyone will recognize.
  However, the HTTP standard defines several others such as PUT and DELETE. These verbs are then applied to resources, according to
  the instructions provided by the server.

  Testing could be manual/automated.

  Manual testing of our ReST api could be done using the 'Request Module'. It allows you to make http requests from our node.js application.

  GET:
 */

request('http://localhost:3000/api/joke', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
});

//POST

request({
        url: "http: //localhost:3000/api/joke",
        method: "POST",
        json: true,
        body: {
            joke: "I'm a joke"
        }
    },
    function (error, res, body) {
        if (!error && res.statusCode == 200) {
            console.log(body);
        }
    });

/*
Automated Testing

 Mocha is a feature-rich JavaScript test framework running on Node.js and the browser, making asynchronous testing simple and fun.
  Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases.

 Mocha allows you to use any assertion library you want, if it throws an error, it will work! This means you can utilize libraries such as: chai expect(), assert() and should style assertions.


 */

var assert = require('assert');
describe('Array', function() {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        });
    });
});

//Hooks
//can be used to set up preconditions and clean up after your tests.

describe('hooks', function() {

    before(function() {
        // runs before all tests in this block
    });

    after(function() {
        // runs after all tests in this block
    });

    beforeEach(function() {
        // runs before each test in this block
    });

    afterEach(function() {
        // runs after each test in this block
    });

    // test cases
});

// Testing Asynchronous

var expect = require("chai").expect;

describe("Testing async behaviour", function(){
    var foo = false;
    before(function(done){
        setTimeout(function(){
            foo = true;
            //done();  //Test will fail without this
        }, 1000);
    });
    it("should pass (with done called)", function(){
        expect(foo).to.equal(true);
    });
});

//Example using chai

var expect = require("chai").expect;

describe('Array', function(){
    describe('Verify the #indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            expect([1,2,3].indexOf(0)).to.be.equal(-1);
            expect([1,2,3].indexOf(5)).to.be.equal(-1);
            expect([1,2,3].indexOf(3)).to.be.equal(2);
        })
    })
});