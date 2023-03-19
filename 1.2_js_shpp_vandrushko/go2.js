function readHttpLikeInput() {
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for (; ;) {
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) { break; /* windows */ }
        if (buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10)
                break;
            was10++;
        } else
            was10 = 0;
        res += new String(buffer);
    }

    return res;
}

let contents = readHttpLikeInput();

function parseTcpStringAsHttpRequest(string) {
    const request = string
        .split("\n")
        .filter(element => /[^ ]/.test(element));
    const methodAndUrl = request
        .shift()
        .split(" ");
    const body = request.pop();
    const headers = request.reduce((object, element) => {
        const [key, value] = element.split(": ");
        object[key.toLowerCase().replace(/^[a-z]|([ \-][a-z])/g, (letter) => letter.toUpperCase())] = value;
        return object;
    }, {});
    return {
        method: methodAndUrl[0].toUpperCase(),
        uri: methodAndUrl[1],
        headers: headers,
        body: body,
    };
}

function outputHttpResponse(statusCode, statusMessage, headers, body) {
    const server = "Apache/2.2.14 (Win32)"
    const connection = "Closed"
    const contentType = "text/html; charset=utf-8"


    const response = 
    `HTTP/1.1 ${statusCode} ${statusMessage}
Date: ${new Date().toString()}
Server: ${server}
Content-Length: ${((body?.body || body) + "").length}
Connection: ${connection}
Content-Type: ${contentType}

${body?.body || body}`;

    console.log(response);
}

function processHttpRequest($method, $uri, $headers, $body) {
    let statusCode, statusMessage, body;
    let sum
    try {
        sum = $uri
            .split('=')[1]
            .split(',')
            .reduce((accumulator, currentNumber) => +accumulator + +currentNumber);
    } catch (error) {
        sum = undefined;
    }
    if (!$uri.startsWith("/sum")) {
        statusCode = 404;
        statusMessage = "Not Found";
        body = "not found"
    }
    else if ($method === "GET" && sum) {
        statusCode = 200;
        statusMessage = "OK";
        body = sum
    }
    else {
        statusCode = 400;
        statusMessage = "Bad Request";
        body = "Bad Request"
    }
    outputHttpResponse(statusCode, statusMessage, $headers, body);
}

http = parseTcpStringAsHttpRequest(contents);
http1 = parseTcpStringAsHttpRequest(
`POST ?nums=1,2,3 HTTP/1.1
Host: student.shpp.me`);

processHttpRequest(http.method, http.uri, http.headers, http.body);
processHttpRequest(http1.method, http1.uri, http1.headers, http1.body);