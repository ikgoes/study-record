const net = require('net');
const dns = require('dns');

const server = net.createServer((client) => {
    console.log(`client has been connected to server from IP : ${client.remoteAddress} Port : ${client.remotePort}`);
    client.write("> Enter the DNS to lookup!\r\n> ");
    let Buffer = new String();

    client.on('data', (data) => {
        if (data.toString() === '\r\n') {       // procoess when string is entered
            DNSLookUp(Buffer, client);
            Buffer = new String();
        } else if (data.toString() === '\b')    // process backspace
            Buffer = Buffer.slice(0, Buffer.length - 1);
        else
            Buffer += data.toString();
    });

    client.on('end', () => {
        console.log('client has been disconnected');
        server.close();
    });
});

server.on('error', (err) => {
    throw err;
});

server.listen(9000,"0.0.0.0" () => {
    console.log('Server is currently working and waiting for connections');
});

server.on('close', () => {
    console.log("Server has been closed");
});

const DNSLookUp = (Buffer, client) => {
    if (Buffer.length > 255) { // check Buffer size
        client.write("Requested Link is too long.\r\n");
        client.write("\r\n> Enter the DNS to lookup!\r\n> ");
    } else {
        dns.resolve4(Buffer, (error, requestedIPAddresses) => {
            if (error === null) {
                requestedIPAddresses.forEach((IPAddress) => {
                    client.write(`Name : ${Buffer}\r\n`);
                    client.write(`Address : ${IPAddress}\r\n`);
                });
            } else { // Error found        
                if (error.errno === "ENOTFOUND")
                    client.write(`Entered DNS was not found.\r\n`);
            }
            client.write("\r\n> Enter the DNS to lookup!\r\n> ");
        });
    }
}