
var dgram  = require('dgram'),
server = {
	host: 'localhost',
	port: 5100
};

function Command() {

	process.stdin.on('data', function(chunk) {

		var message = chunk.toString().replace(/\n|\n/g, '');

		if (message == 1) {
			var object  = '{"type":"disconnect"}';
			console.log('Aperte ctrl + c para sair');
		} else {
			var object  = '{"type":"message","message":"'+message+'"}';
		}

	 	var buffer  = new Buffer(object);
	 	client.send(buffer, 0, buffer.length, server.port, server.host);

	});

}

var client = dgram.createSocket('udp4', function(message, rinfo) {
	
	console.log('%s', message.toString());
	process.stdin.resume();

	process.stdin.removeAllListeners('data');
	process.stdin.on('data', function(chunk) {
	 	Command();
	});

});

client.bind();

client.on('listening', function() {
	var buffer = new Buffer('{"type":"connect"}');
	console.log('Cliente conectado na porta %d.', client.address().port);
	console.log('(Envie "1" para sair)');
	client.send(buffer, 0, buffer.length, server.port, server.host);

});

client.on('error', function(err) {
	console.log(err);
});

client.on('close', function() {
	var buffer = new Buffer('{"type":"disconnect"}');
	console.log('Client disconectado.', client.address().port);
	client.send(buffer, 0, buffer.length, server.port, server.host);

})

process.stdin.resume();
Command();