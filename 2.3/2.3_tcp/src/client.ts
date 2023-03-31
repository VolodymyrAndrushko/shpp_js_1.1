import net from 'net';

const port: number = 3000;
const host: string = 'localhost';

const messageToServer: string = "Hello its TCP !";

const client = new net.Socket();

client.connect(port, host);

client.write(messageToServer);

client.on('data', (data:{})=>{
    const messageFromServer= data.toString();
    console.log(`Message from server: ${messageFromServer}`)
    if (messageFromServer === messageToServer){
        console.log(`OK. Response message matches!`);
    }
    else {
        console.log(`FAil. Response message doesn't matches!`);
    }
})

client.end()