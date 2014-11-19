console.log('Express start..');

var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var express = require('express');

var dao = require('./dao');

var app = express();
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use('/data', function(req, res) {
	var tableName = 'T_CM_USER';
	if (req.method === 'GET') {
		tableName = (req.query && req.query.name) ? req.query.name.toUpperCase() : tableName;
	} else if (req.method === 'POST') {
		tableName = (req.body && req.body.name) ? req.body.name.toUpperCase() : tableName;
	}

	dao.queryData(tableName, function(err, rows, fields) {
		if (err) {
			res.redirect('/data');
			return false;
		}

		fs.readFile(path.join(__dirname, './views/index.html'), function(err, fd) {
			if (err) {
				console.log(err);
				throw err;
			}

			res.send(ejs.render(fd.toString(), {
				title: tableName,
				tableName: tableName,
				data: rows
			}));
		});
	});
});

app.get('/', function(req, res) {
	res.redirect('/data');
});

app.listen(8888);