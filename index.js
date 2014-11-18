console.log('Express start..');

var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var ejs = require('ejs');
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(bodyParser.json());

app.get('/data', function(req, res) {
	var conn = mysql.createConnection({
		host : '192.168.120.10',
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
				title : 'someTitle',
				tableName : 'T_CM_USER',
				users : rows
			}));
		});
	});
});

app.post('/form', function(req, res) {
	res.redirect('/data');
});

app.get('/zh', function(req, res) {
	res.send('你好');
});

app.get('/en', function(req, res) {
	res.send('hello world');
});

app.get('/', function(req, res) {
	res.redirect('/data');
});

app.listen(8888);