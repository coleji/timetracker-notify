var moment = require("moment");

var getConnection = require("./src/getConnection");
var getDays = require("./src/getDays");
var sendEmail = require("./src/sendEmail");

var dbConnection = getConnection();

var DATE_FORMAT = "MM/DD/YYYY";

getDays(dbConnection).then(function(days) {
	var dayStrings = days.map(function(day) {
		return moment(day).format(DATE_FORMAT);
	});
	var today = new moment().format(DATE_FORMAT);
	var todayIsUnentered = dayStrings.filter(function(day) {
		return day == today
	}).length == 1;

	if (todayIsUnentered) return sendEmail();
	else return Promise.resolve();
}).then(function() {
	console.log("worked")
}, function(err) {
	console.log("Error: " + err)
}).then(function() {
	console.log("closing db connection")
	dbConnection.end();
});
