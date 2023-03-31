import http from 'http'


const port = 8000;

const server = http.createServer((req, res) => {
    const currentDate = new Date();
    const userIpAddress = req.socket.remoteAddress;
    let body: string = '';

    req.on('data', function (chunk) {
        body += chunk.toString();
    });
    req.on('end', function () {
        const requestBody = body;
        res.write(requestBody);
        res.end();
        console.log(`Request from IP: ${userIpAddress} Date: ${currentDate} \nContent: ${body}\n`)
    });
});

server.listen(port);

console.log(`Server started on port ${port}`);


const options = {
    hostname: 'localhost',
    port: port,
    method: 'POST',
};

const requestCallback = (res: http.IncomingMessage) => {
    let body: string = '';
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


const req = http.request(options, requestCallback);

const requestData = 'Hello World!';

req.write(requestData);
req.end();