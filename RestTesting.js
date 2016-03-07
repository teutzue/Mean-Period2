/**
 * Created by CosticaTeodor on 07/03/16.
 */

/*
Rest Strategy:
 Define our Node packages, start our server using Express, define our model, declare our routes using Express, and last
 but not least, test our API.

 Base Setup In our base setup, we pull in all the packages we pulled in using npm. We’ll grab express, define our app,
 get bodyParser and configure our app to use it. We can also set the port for our application.

 Routes for Our API This section will hold all of our routes. The structure for using the Express Router let’s us pull
 in an instance of the router. We can then define routes and then apply those routes to a root URL

 Start our Server We’ll have our express app listen to the port we defined earlier.

 Use middleware between the request and the response to create CRUD handling code.


The request module could be used to programatically test our Rest Api as following:

 */

//GET

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


//PUT
request({
        url: "http: //localhost:3000/api/joke/3",
        method: "PUT",
        json: true,
        body: {
            joke: "I'm an updated joke"
        }
    },
    function (error, res, body) {
        if (!error && res.statusCode == 200) {
            console.log(body);
        }
    });


//DELETE
request({
        url: "http: //localhost:3000/api/joke/3",
        method: "Delete",
    },
    function (error, res, body) {
        if (!error && res.statusCode == 200) {
            console.log(body);
        }
    });
