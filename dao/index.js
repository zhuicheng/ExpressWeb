var mysql = require('mysql');

var pool = mysql.createPool({
	host: '192.168.120.10',
	user: 'root',
	password: 'root',
	connectionLimit: 3,
	database: 'uccp',
	debug: false
});

module.exports.queryData = function(tableName, callback) {
	pool.query('SELECT * FROM ' + tableName, function(err, rows, fields) {
		if (callback) {
			callback(err, rows, fields);
		}
	});
};