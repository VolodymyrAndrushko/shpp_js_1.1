import udp from "dgram"

const server = udp.createSocket('udp4');

const port:number = 3000;

const host:string = "localhost";

server.on('listening', ()=>{
    const address = server.address();

    console.log(`Listening to Address: ${address}, Port: ${port}, Time: ${new Date()}`)
});

server.on('message', (message, info) =>{
    const currentTime = new Date();
    const userPort = info.port;
    const address = info.address;

    let responseMessage = message.toString();

    const response = Buffer.from(responseMessage);
    console.log(`Server get Message: ${message} Time: ${currentTime}`);


    server.send(response, userPort, address, (error)=>{
        if(error){
            console.log(`Failed to send response! Error: ${error} Time: ${currentTime}`);
        }
        else {
            console.log(`Respond send successfully! Time: ${currentTime}`);
        }
    })
});

server.bind(port);