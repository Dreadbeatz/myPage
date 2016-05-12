var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	port : '3306',
	user : 'root',
	password : 'secret',
	database : 'mygamesdb'
});

function enterDataDB(s, n, t){
	if(n == ""){n = "Unknown";}
	var sql ='INSERT INTO ' + t + ' SET ?';
	var d = new Date().toISOString();
	var input = {
		score : s,
		name : n,
		date : d
	};
	console.log(sql);
	connection.query(sql, input, function(err){
		if(err){
			console.log('Error while executing query.....\n');
			throw err;
		}else{
			console.log('\nEntered ' + input.name + ' with score: ' + input.score + ' in DB: ' + t);
			console.log('Query executed corectly...\n');
		}
	});
}


app.get('/leaderAngrySmiley', function(req, res){
	var outputs = [];
	connection.query('SELECT * from angry_smiley ORDER BY score DESC', function(err, rows, fields){
		if(err){
			console.log('Error while performing query....\n');
			throw err;
		}else{
			for(var i = 0; i < rows.length; i += 1){
				outputs.push(rows[i]);
			}
			res.json(outputs);
		}
	});
});

app.get('/leaderSpaceInvaders', function(req, res){
	var outputs = [];
	connection.query('SELECT * from space_invaders ORDER BY score DESC', function(err, rows, fields){
		if(err){
			console.log('Error while performing query....\n');
			throw err;
		}else{
			for(var i = 0; i < rows.length; i += 1){
				outputs.push(rows[i]);
			}
			res.json(outputs);
		}
	});
});

app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/scripts'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/AngrySmiley'));
app.use(express.static(__dirname + '/SpaceInvaders'));
app.use(express.static(__dirname + '/Chat'));
app.use(express.static(__dirname + '/pages'));

app.get('/angrySmiley', function (req, res) {
	var name = req.query.name;
	var score = req.query.score;
	
	enterDataDB(score,name,'angry_smiley');
	
	res.sendFile(__dirname + '/AngrySmiley/angrySmiley.html');
});

app.get('/spaceInvaders', function (req, res) {
	var name = req.query.name;
	var score = req.query.score;
	
	enterDataDB(score,name,'space_invaders');
	
	res.sendFile(__dirname + '/SpaceInvaders/spaceInvaders.html');
});

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('user connected\n');
	socket.on('chat_message', function(msg){
		console.log('message: ' + msg + '\n');
		io.emit('chat_message', msg);
	});
});

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});