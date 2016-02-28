var express    = require('express');
var quotesApp = require('./quotes.js');
var app        = express();
var port = process.env.PORT || 8080;
var router = express.Router();

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
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
//app.use('/api/quote', router);
//app.use('/api/quotes', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server listening on port ' + port);