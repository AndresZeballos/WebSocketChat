var host = window.location.host;

var socket = io.connect(host, {'forceNew':true});

socket.on('messages', function(data){
	console.log(data);
	renderMessages(data);
});

function renderMessages(messages){
	var html = messages.map(function(message, index){

		return (`
			<div class="message">
				<strong>${message.user}</strong> dice: 
				<p>${message.text}</p>
			</div>
			`);
	}).join(' ');

	document.getElementById('messages').innerHTML = html;
}

function addMessage(e){
	var message = {
		user: document.getElementById('user').value,
		text: document.getElementById('text').value
	}
	document.getElementById('user').style.display = 'none';
	socket.emit('add-message', message);
	return false;
}


