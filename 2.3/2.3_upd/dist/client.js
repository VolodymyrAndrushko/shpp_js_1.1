"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dgram_1 = __importDefault(require("dgram"));
const client = dgram_1.default.createSocket('udp4');
const port = 3000;
const host = "localhost";
const messageToServer = `MESSAGE FROM CLIENT HELLO`;
client.on("message", (message, info) => {
    const currentTime = new Date();
    const address = info.address;
    const userPort = info.port;
    const size = info.size;
    const messageFromServer = message.toString();
    console.log(`Address: ${address}, Port: ${userPort}, Size: ${size}, Time: ${currentTime}`);
    console.log(`Message: ${messageFromServer}`);
    if (messageToServer === messageFromServer) {
        console.log("OK. Get the same message from server.");
    }
    else {
        console.log("No. Get the different response message from server.");
    }
});
const packet = Buffer.from(messageToServer);
client.send(packet, port, host, (error) => {
    const currentTime = new Date();
    if (error) {
        console.log(`Failed to send a packet: ${error} Time: ${currentTime}`);
    }
    else {
        console.log(`Packet send! Time: ${currentTime}`);
    }
});
//# sourceMappingURL=client.js.map