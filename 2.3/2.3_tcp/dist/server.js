"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const port = 3000;
const host = 'localhost';
const server = net_1.default.createServer();
server.listen(port, host, () => {
    const currentTime = new Date();
    console.log(`Server running on Port: ${port}, Host: ${host}, Time: ${currentTime}`);
});
let sockets = [];
server.on('connection', function (sock) {
    const clientAddress = sock.remoteAddress;
    const clientPort = sock.remotePort;
    console.log(`CONNECTED: ${clientAddress}:${clientPort}, Time: ${new Date()}`);
    sockets.push(sock);
    sock.on('data', function (data) {
        console.log(`Server get data from Address: ${clientAddress}, DATA: ${data}, Time: ${new Date()}`);
        sockets.forEach(function (sock, index, array) {
            sock.write(data.toString());
        });
    });
    sock.on('close', function (data) {
        let index = sockets.findIndex(function (o) {
            return o.remoteAddress === sock.remoteAddress &&
                o.remotePort === sock.remotePort;
        });
        if (index !== -1)
            sockets.splice(index, 1);
        console.log(`Connection CLOSED, Address: ${sock.remoteAddress}, Port: ${sock.remotePort}`);
    });
});
//# sourceMappingURL=server.js.map