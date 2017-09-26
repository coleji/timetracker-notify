var mysql = require("mysql");
var fs = require('fs')
var ini = require('ini')

var dbCredentials = ini.parse(fs.readFileSync('./ini/private.ini', 'utf-8')).database;

module.exports = function() {
	return mysql.createConnection(dbCredentials);
}
