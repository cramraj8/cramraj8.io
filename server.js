var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser')
var session = require('express-session')
var bodyParser = require('body-parser')
var http = require('http');

var server = http.createServer(app);

function checkAuth (req, res, next) {
	console.log('checkAuth ' + req.url);

	if (req.url === '/secure' && (!req.session || !req.session.authenticated)) {
        res.sendFile(path.join(__dirname + '/unauthorised.html'), { status: 403 });
		return;
	}

	next();
}


app.use(cookieParser());
app.use(session({ secret: 'example' }));
app.use(bodyParser());
app.use(checkAuth);
app.use(express.static('public'))

app.set('port', process.env.PORT || 3000);

//viewed at http://localhost:8080
app.get('/secure', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/', function (req, res, next) {
    if (req.body.email && req.body.email === 'user' && req.body.password && req.body.password === 'pass') {
        req.session.authenticated = true;
        res.redirect('/secure');
    } else {
        res.redirect('/');
    }
});

app.get('/logout', function (req, res, next) {
	delete req.session.authenticated;
	res.redirect('/');
});

app.listen(8080);

// run server
server.listen(app.get('port'), function () {
    console.log("Web server listening on port " + app.get('port') + ' ENV: ' + process.env.NODE_ENV);
});
