console.log('Express start..');

var express = require('express');
var app = express();

app.use(function(req, res, next) {
	console.error("当前时间：%s", Date.now());
	next();
});

app.get('/zh', function(req, res) {
	res.send('你好');
});

app.get('/en', function(req, res) {
	res.send('hello world');
});

app.get('/', function(req, res) {
	res.redirect('/zh');
});

app.listen(8888);