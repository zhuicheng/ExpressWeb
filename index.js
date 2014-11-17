console.log('Express start..');

var path = require('path');
var fs = require('fs');
var mysql = require('mysql');
var ejs = require('ejs');
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, './public')));

app.get('/data', function(req, res) {
	var conn = mysql.createConnection({
		host : '192.168.20.239',
		user : 'root',
		password : 'root',
		database : 'uccp'
	});

	conn.query('SELECT * FROM T_CM_USER', function(err, rows, fields) {
		if (err) {
			console.error('%s', err);
			throw err;
		}

		fs.readFile(path.join(__dirname, './views/index.html'), function(err, fd) {
			if (err) {
				console.log(err);
				throw err;
			}

			res.send(ejs.render(fd.toString(), {
				title : 'hereee..',
				content : '首页',
				tableName: 'T_CM_USER',
				users : rows
			}));
		});
	});
});

app.get('/zh', function(req, res) {
	res.send('你好');
});

app.get('/en', function(req, res) {
	res.send('hello world');
});

app.get('/', function(req, res) {
	// res.redirect('/zh');
	fs.readFile(path.join(__dirname, './views/index.html'), function(err, fd) {
		if (err) {
			console.log(err);
			throw err;
		}

		var users = [];
		users.push({
			name : 'Tobi',
			age : 2
		});
		users.push({
			name : 'Loki',
			age : 2
		});
		users.push({
			name : 'Jane',
			age : 6
		});

		res.send(ejs.render(fd.toString(), {
			title : 'hereee..',
			content : 'data页面',
			users : users
		}));
	});
});

app.listen(8888);