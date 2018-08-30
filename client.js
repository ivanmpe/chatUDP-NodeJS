const dgram  = require('dgram');

server = {
	host: 'localhost',
	port: 5100
};


var client = dgram.createSocket('udp4', function(message, rinfo) {
	
	console.log('%s', message.toString());
	process.stdin.resume();

	process.stdin.removeAllListeners('data');
	process.stdin.on('data', function(chunk) {
	 	Command();
	});

});


function Command() {

	process.stdin.on('data', function(chunk) {
		var message = chunk.toString().replace(/\n|\n/g, '');
		var object  =  message;
		var buffer  = Buffer.from(object);
	 	client.send(buffer, 0, buffer.length, server.port, server.host);
	});

}


client.bind();

client.on('listening', function() {
	var buffer = Buffer.from(`Novo cliente conectado na porta ${client.address().port}`);
	console.log('Você esta conectado na porta %d.', client.address().port);
	client.send(buffer, 0, buffer.length, server.port, server.host);
});

client.on('error', function(err) {
	console.log(err);
});

client.on('close', function() {
	var buffer = Buffer.from('{"type":"disconnect"}');
	console.log('Cliente disconectado.', client.address().port);
	client.send(buffer, 0, buffer.length, server.port, server.host);
})

process.stdin.resume();
Command();

