"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dgram_1 = __importDefault(require("dgram"));
const server = dgram_1.default.createSocket('udp4');
const port = 3000;
const host = "localhost";
server.on('listening', () => {
    const address = server.address();
    console.log(`Listening to Address: ${address}, Port: ${port}, Time: ${new Date()}`);
});
server.on('message', (message, info) => {
    const currentTime = new Date();
    const userPort = info.port;
    const address = info.address;
    let responseMessage = message.toString();
    const response = Buffer.from(responseMessage);
    console.log(`Server get Message: ${message} Time: ${currentTime}`);
    server.send(response, userPort, address, (error) => {
        if (error) {
            console.log(`Failed to send response! Error: ${error} Time: ${currentTime}`);
        }
        else {
            console.log(`Respond send successfully! Time: ${currentTime}`);
        }
    });
});
server.bind(port);
//# sourceMappingURL=server.js.map