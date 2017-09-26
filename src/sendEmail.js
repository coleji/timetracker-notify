var mysql = require("mysql");
var fs = require('fs')
var ini = require('ini')
var https = require("https");

var config = ini.parse(fs.readFileSync('./ini/private.ini', 'utf-8')).sendgrid;

module.exports = function() {
	var string = "Work hours have not yet been logged today!";

	var body = {
		"personalizations": [{
			"to": [{
				"email": config.emailTo
			}]
		}],
		"from": {
			"email": config.emailFrom
		},
		"subject": " ",
		"content": [{
			"type": "text/plain",
			"value": string
		}]
	}

	var options = {
		hostname: config.host,
		path: config.path,
		method: 'POST',
		headers : {
			"Authorization" : config.authToken,
			"Content-Type" : "application/json",
			"Content-Encoding" : 'utf-8'
		}
	};

	return new Promise(function(resolve, reject) {
		var sgReq = https.request(options, function(sgRes) {
			console.log('sendgrid statusCode: ', sgRes.statusCode);
			console.log('sendgrid headers: ', sgRes.headers);

			sgRes.on('data', function(d) {
				console.log("Response from sendgrid: " + d)
			})

			resolve();
		});

		sgReq.on('error', function(e) {
			console.log(e);
			reject(e);
		})

		console.log(JSON.stringify(body))
		sgReq.write(JSON.stringify(body));
		sgReq.end();
	})
}
