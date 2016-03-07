/**
 * Created by CosticaTeodor on 07/03/16.
 */

/*
 Here's an example of how to mock out HTTP-requests. You simply create an object, function or third part module
 to trick the behaviour of your test.
 */
//Module to be tested:
var request = require("request");
var URL = "http://jokes-plaul.rhcloud.com/api/joke";

function getJoke(callback) {     console.log("before request");
    request(URL, function (error, response, body) {
        console.log("in request callback");
        if(error || response.statusCode >=400){
            return callback(error || body );
        }         callback(null,JSON.parse(body));
    });
};

module.exports = {
    getJoke : getJoke };
getJoke(function (err, joke) {
    console.log(joke);
});

var expect = require("chai").expect;
var jokes = require("../jokeModule");
var nock = require("nock");
var testJoke = {"id": 1234, "joke": "ha ha ha", "reference": "unknown"};
var n = nock('http://jokes-plaul.rhcloud.com');

describe('Person API Get', function () {
    before(function (done) {
        n.get('/api/joke')
            .reply(200,testJoke );
        console.log("in before");
        done();
    });

    it('should fetch the vampire joke', function (done) {
        console.log("starting my test");
        jokes.getJoke(function (err, joke) {
            if (err) {
                throw err;
            }
            expect(joke.reference).to.be.equal("unknown");
            expect(joke).to.be.eql(testJoke);
            done();
        })
        console.log("after call to getJoke");
    });
});

/*
 What this does is that when any request is sent out from the test, it's caught by the mocking object and handled by that.
 So the actual request never reaches the internet or outside this piece of software - it's processed by the third party
 mocking module called Nock.
 */