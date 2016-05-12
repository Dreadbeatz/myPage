$(document).ready(function(){
	$('#chatForm').width($('#chat').width());
	var socket = io();
	var person = prompt("Please enter your name", "Gandalf");

	$('#chatForm').submit(function(){
		socket.emit('chat_message', person + '~' + $('#inputMsg').val());
		$('#inputMsg').val('');
		return false;
	});

	socket.on('chat_message', function(msg){
		$("#messages").animate({
			scrollTop: $('#messages').get(0).scrollHeight
		}, 10);
		
		var values = msg.split('~');
		var li = document.createElement('li');
		if(values[0] == person){
			li.innerHTML = '<span id="me" class="name">' + values[0] + ':</span> <span class="msg">' + values[1] + '</span>';
		}else{
			li.innerHTML = '<span id="others" class="name">' + values[0] + ':</span> <span class="msg">' + values[1] + '</span>';
		}
		$('#messages').append(li);
	});
	
	$(window).resize(function(){
		$('#chatForm').width($('#chat').width());
	});
});