/**
 * Created by CosticaTeodor on 07/03/16.
 */

/*
CONTEXT

 Server side technologies can implement state or server side sessions using one or more of the following methods:

 HTTP cookies.
 Query string parameters, for example: /index.php?session_id=some_unique_session_code.
 Hidden variables within web forms

 Legislation on cookies

 However, some cookies are exempt from this requirement. Consent is not required if the cookie is:
 -used for the sole purpose of carrying out the transmission of a communication, and
 -strictly necessary in order for the provider of an information society service explicitly required by the user to provide that service.

 Cookies clearly exempt from consent according to the EU advisory body on data protection- WP29pdf include:
 -user‑input cookies (session-id) such as first‑party cookies to keep track of the user's input when filling online forms,
 shopping carts, etc., for the duration of a session or persistent cookies limited to a few hours in some cases
 -authentication cookies, to identify the user once he has logged in, for the duration of a session
 -user‑centric security cookies, used to detect authentication abuses, for a limited persistent duration
 -multimedia content player cookies, used to store technical data to play back video or audio content, for the duration of a session
 -load‑balancing cookies, for the duration of session
 -user‑interface customisation cookies such as language or font preferences, for the duration of a session (or slightly longer)
 -third‑party social plug‑in content‑sharing cookies, for logged‑in members of a social network.
 */

//A simple example using express-session to store page views for a user.

var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session') //use the session middleware

var app = express()

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(function (req, res, next) {
    var views = req.session.views

    if (!views) {
        views = req.session.views = {}
    }

    // get the url pathname
    var pathname = parseurl(req).pathname

    // count the views
    views[pathname] = (views[pathname] || 0) + 1

    next()
})

app.get('/foo', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

app.get('/bar', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})

//example 2

var express = require('express');
var session = require("express-session");
var app = express();

//Alot of other middleware stuff is going on here


app.use(session({
    secret: 'secretWordIsSecret',
    saveUninitialized: true,
    resave: true
}));


app.use(function (req, res, next) {
    //Taking the session object from the request object.
    var sess = req.session;


    //If the session object has a userName, the request is allowed access to the rest of the site and we call next() to
    // go to the next middleware in the express stack.
    if (sess.userName) {
        return next();
    }

    //Else if the requests body has a userName, that means that it's a login attempt, so we will save the username to the
    // session and respond with a redirect to '/' path.
    else if (req.body.userName) {
        sess.userName = req.body.userName;
        return res.redirect('/');
    }

    //Else the user is not logged in and is not trying to login, so we do not want to give access to the rest of the site
    // so we redirect to the '/login' page.
    else {
        return res.redirect('/login');
    }
});