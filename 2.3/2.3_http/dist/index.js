"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const port = 8000;
const server = http_1.default.createServer((req, res) => {
    const currentDate = new Date();
    const userIpAddress = req.socket.remoteAddress;
    let body = '';
    req.on('data', function (chunk) {
        body += chunk.toString();
    });
    req.on('end', function () {
        const requestBody = body;
        res.write(requestBody);
        res.end();
        console.log(`Request from IP: ${userIpAddress} Date: ${currentDate} \nContent: ${body}\n`);
    });
});
server.listen(port);
console.log(`Server started on port ${port}`);
const options = {
    hostname: 'localhost',
    port: port,
    method: 'POST',
};
const requestCallback = (res) => {
    let body = '';
    res.on('data', function (chunk) {
        body += chunk.toString();
    });
    res.on('end', function () {
        const responseBody = body.toString();
        if (requestData === responseBody) {
            console.log(`OK.Response text matches.\n`);
        }
        else {
            console.log(`FAIL.Response text doesn't match.\n`);
        }
    });
};
const req = http_1.default.request(options, requestCallback);
const requestData = 'Hello World!';
req.write(requestData);
req.end();
//# sourceMappingURL=index.js.map