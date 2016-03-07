/**
 * Created by CosticaTeodor on 06/03/16.
 */

//5.Explain, using relevant examples, the Express concept; middleware.

/*
Definition:

 A middleware is a function with access to the request object (req), the response object (res), and the next middleware
 in line in the request-response cycle of an Express application.

 Each middleware has the capacity to EXECUTE ANY CODE (BETWEEN THE REQ AND THE RES), make changes to the request and the
 reponse object, end the request-response cycle, and call the next middleware in the stack. Since middleware are executed
 serially, their order of inclusion is important.

 If the current middleware is not ending the request-response cycle, it is important to call next() to pass on the
 control to the next middleware, else the request will be left hanging.

 */

//Third-party middleware
app.use(bodyParser.urlencoded());
app.use(favicon(__dirname + '/public/favicon.ico'));

//Custom middleware
/*
This will be executed for all incoming requests
 */
app.use(function (req, res, next) {
    console.log('Time:', Date.now()+"Log all requests");
    next();
});

//Route functions, executed for "/somePath" url
app.all('/somePath',function(req,res){
    console.log("Log on all request for /somePath (GET,POST, PUT, DELETE)")
})
app.get('/somePath', function(req, res){
    res.send('This is a route');
});
app.post('/somePath', function(req, res){
    //.. Do something with the request parameters
});

//Built-in middleware (the only one left in V4.x.x)
app.use(express.static('./public'));

/*
The next() method passes the responsability to the next middleware if it does not end the req-res cycle.
 */

app.use('/secretPage',function (req, res, next) {
    console.log('Someone was at the secret page at:', Date.now());
    next();
});

/*
Use middleware for routing
 */

var users = require('./routes/users');
var login = require('./routes/login');

app.use('/users', users);
app.use('/login', login);
