var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hi', function(req, res) {
  res.status(200).send('Hello motherfuckers');
});

var messages = [{
	id: 1,
	text: 'Bienvenido!',
	user: 'Owner'
}]

io.on('connection', function(socket){
	console.log('Nuevo cliente conectado ' + socket.handshake.address);
	socket.emit('messages', messages);

	socket.on('add-message', function(data){
		messages.push(data);
		io.sockets.emit('messages', messages);
	})
});

var PORT = process.argv[2] || 80;

server.listen(PORT, function() {
	console.log('Server runing on port: '+PORT);
});



