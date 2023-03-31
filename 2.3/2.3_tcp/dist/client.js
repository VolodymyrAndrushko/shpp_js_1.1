"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const port = 3000;
const host = 'localhost';
const messageToServer = "Hello its TCP !";
const client = new net_1.default.Socket();
client.connect(port, host);
client.write(messageToServer);
client.on('data', (data) => {
    const messageFromServer = data.toString();
    console.log(`Message from server: ${messageFromServer}`);
    if (messageFromServer === messageToServer) {
        console.log(`OK. Response message matches!`);
    }
    else {
        console.log(`FAil. Response message doesn't matches!`);
    }
});
client.end();
//# sourceMappingURL=client.js.map