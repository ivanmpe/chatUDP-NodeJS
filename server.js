const dgram = require('dgram');
const server = dgram.createSocket('udp4');


//inicia o servidor
server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});


// aprensenta a(s) mensagem(ns) recebida(s)
server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

//fica verficando caso haja mensagem
server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(5100);