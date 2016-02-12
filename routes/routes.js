var sugar = require("sugar");
var moment = require("moment");

var appRouter = function(app) {

	app.get("/:query", function(req, res) {

		//Grab date query from URL
		var date = req.params.query;
		
		//Check if query entered is a number
		if(isNaN(date)) {
			
			try {
				var naturalDate = Date.create(date).format('{Month} {dd}, {yyyy}');
				var naturalToISO = Date.create(date).toISOString();
				var naturalUnix = moment(naturalToISO).unix();
			} catch (e) {
				
				naturalDate = null;
				naturalUnix = null;
			}

			res.json({ "unix": naturalUnix, "natural": naturalDate });

		} else {
			//Else, query entered is a number
			//Assuming unix number

			var unixToDate = moment.unix(date).toISOString();
			var unixToNatural = Date.create(unixToDate).format('{Month} {dd}, {yyyy}');

			//Just to be sure we get the same unix timestamp back
			var unixToUnix = moment(unixToDate).unix();

			if(unixToDate.toString() === 'Invalid date') {
				res.json({ "unix": "null", "natural": "null" });
			} else {
				res.json({ "unix": unixToUnix, "natural": unixToNatural });
			}

		}
		
	});
}

module.exports = appRouter;