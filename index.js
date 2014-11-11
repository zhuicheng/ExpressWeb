console.log('Express start..');

var path = require('path');
var fs = require('fs');
var ejs = require('ejs');
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, './public')));

app.get('/zh', function(req, res) {
	res.send('你好');
});

app.get('/en', function(req, res) {
	res.send('hello world');
});

app.get('/', function(req, res) {
	// res.redirect('/zh');
	fs.readFile(path.join(__dirname, './views/index.js'), function(err, fd) {
		if (err) {
			console.log(err);
			throw err;
		}
		
		var users = [];
		users.push({ name: 'Tobi', age: 2, species: 'ferret' });
		users.push({ name: 'Loki', age: 2, species: 'ferret' });
		users.push({ name: 'Jane', age: 6, species: 'ferret' });
		
		res.send(ejs.render(fd.toString(), {
			title : 'hereee..',
			content : '首页',
			users: users
		}));
	});
});

app.listen(8888);