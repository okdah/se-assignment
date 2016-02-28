var MongoClient = require('mongodb').MongoClient;
var exports = module.exports;

exports.connect = function(cb) {
	MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
  		if(!err) {
    		cb(db);
  		}
  		else
  		{
  			cb(err);
  		}
	});
};

exports.db = function() {
		exports.connect(function(d) {
			return d;
		});
};

exports.clearDb = function(cb) {
	MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
  		if(!err) {
    		db.listCollections().toArray(function (err, collections) {
    			var c = collections.map(function (x) {
    				return x.name.replace(/^([^.]*)./,"");
    			});
    			c.forEach(function (element, index, array) {
    				if (element !== "")
    				{
    					db.collection(element).drop(function (err, response) {
    						console.log(response);
    					});
    				}
    			});
    			cb();
    		});
  		}
  		else
  		{
  			cb();
  		}
	});
};

exports.clearDb(function (cb) {

});