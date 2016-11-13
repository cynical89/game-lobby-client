var socket = require("socket.io-client")
var config = require("./config.json");

var io = socket.connect(`${config.site.apiHost}:${config.site.port}`);

io.once("connect", function() {
	console.log("Client connected!");
});

$('form').submit(function(){
	io.emit('chat message', $('#m').val());
	$('#m').val('');
	return false;
});
io.on('chat message', function(msg){
	$('#messages').append($('<li>').text(msg));
});
