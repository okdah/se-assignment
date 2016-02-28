var MongoClient = require('mongodb').MongoClient;
var quotes = require('../quotes.json');
var exports = module.exports = {};

exports.getElementByIndexElseRandom = function(array, index) {
	index = index || -1;
	if (index === -1)
	{
		var rand = Math.floor(Math.random() * array.length);
		return array[rand];
	}
	else
	{
		return array[index];
	}
};

exports.getQuotesFromJSON = function() {
	return quotes;
};

exports.getQuoteFromJSON = function(index){
	return quotes[index];
};

exports.seed = function(cb){
	MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
  		if(!err) {
    		console.log("We are connected");
    		db.createCollection('coll', function(err, collection) {
    			if (err)
    			{
    				cb(err, false);
    			}
    			collection.insert(quotes);
				cb(null, true);
    		});
  		}
  		else
  		{
  			cb(err, false);
  		}
	});
};

exports.getQuotesFromDB = function(cb) {
	MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
  		if(!err) {
    		console.log("We are connected");
    		var cursor = db.collection('coll').find();
    		cursor.toArray(function(err, docs) {
    			if (err)
    			{
    				cb(err, null);
    			}
    			else
    			{
    				cb(null, docs);
    			}
    		});
  		}
  		else
  		{
  			cb(err, null);
  		}
	});
};

exports.getQuoteFromDB = function(cb, index) {
	exports.getQuotesFromDB(function(err, quotesArr) {
		if (err)
		{
			cb(err, null);
		}
		else
		{
			cb(null, exports.getElementByIndexElseRandom(quotesArr, index));
		}
	});
};
