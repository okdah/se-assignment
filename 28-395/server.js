var express    = require('express');
var quotesApp = require('./quotes.js');
var app        = express();
var port = process.env.PORT || 8080;
var router = express.Router();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/api/quote', function(req, res) {
	quotesApp.getQuoteFromDB(function (err, quote) {
		if (!err)
		{
			res.json(quote);
		}
		else
		{
			console.error(err);
		}
	});
});

app.get('/api/quotes', function(req, res) {
	quotesApp.getQuotesFromDB(function (err, quotes) {
		if (!err)
		{
			res.json(quotes);
		}
	});
});

app.get('/', function (req, res) {
	res.sendfile('./public/index.html');
});
app.get('/index.html', function (req, res) {
	res.sendfile('./public/index.html');
});
app.get('/index', function (req, res) {
	res.sendfile('./public/index.html');
});
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
//app.use('/api/quote', router);
//app.use('/api/quotes', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server listening on port ' + port);