const net = require('net');

const server = net.createServer((client) => {
    console.log(`client has been connected to server from IP : ${client.remoteAddress} Port : ${client.remotePort}`);
    client.write("welcome to socket server\r\ntype the message that you want to sent to server\r\n> ");
    let Buffer = new String();

    client.on('data', (data) => {
        if (data.toString() === '\r\n') { // procoess when string is entered
            getInput(Buffer, client);
            Buffer = new String();
        } else if (data.toString() === '\b') // process backspace
            Buffer = Buffer.slice(0, Buffer.length - 1);
        else {
            // check if Buffer is bigger than 1024 bytes
            if ((new TextEncoder().encode(Buffer)).length < 1024)
                Buffer += data.toString();
        }
    });

    client.on('end', () => {
        console.log('client has been disconnected');
    });
});

server.on('error', (err) => {
    throw err;
});

server.listen(9000, "0.0.0.0", () => {
    console.log('Server is currently working and waiting for connections');
});

server.on('close', () => {
    console.log("Server has been closed");
});

const getInput = (Buffer, client) => {
    // check if Buffer length is lower than 4
    if (Buffer.length < 4) {
        client.write("string needs at least 4 characters and can take 1024 bytes at maximum\r\n");
        client.write("\r\ntype the message that you want to sent to server\r\n> ");
    } else {
        console.log('client sent : \"' + Buffer + "\"");
        client.write("server recieved : \"" + Buffer + "\"\r\n");
        client.end();
    }
}