import net from 'net';
import { WebSocket, WebSocketServer } from 'ws';

const TCP_PORT = parseInt(process.env.TCP_PORT || '12000', 10);

const tcpServer = net.createServer();
const websocketServer = new WebSocketServer({ port: 8080 });

// reset incidents.log
const fs = require('fs')
fs.writeFile('incidents.log', '', function() {console.log('done')})

tcpServer.on('connection', (socket) => {
    console.log('TCP client connected');
    
    socket.on('data', (msg) => {
        // makes it a string first so later on can be used
        let tempData = msg.toString();
        console.log(tempData);

        // getting numbers from string
        let reg = /\d+/g;
        let result = tempData.match(reg);
        console.log(result);

        let battery = +result![0];

        if (battery > 80) {
           var tStamp = +result![1];
           console.log(battery + 'error over, stamp ', tStamp);
           
           let makeStringAgain = tStamp.toString();
           let data = 'Error at ' + makeStringAgain + '\n';
           const fs = require('fs');
           fs.writeFile("incidents.log", data, {flag: 'a'}, function(err: any) {
           if(err)
               return console.log(err);
           else {
           console.log("Written log");
           }});
        }
        else if (battery < 20) {
            var tStamp = +result![1];
            console.log(battery + 'error low, stamp ', tStamp);

            let makeStringAgain = tStamp.toString();
            let data = 'Error at ' + makeStringAgain + '\n';
            const fs = require('fs');
            fs.writeFile("incidents.log", data, {flag: 'a'}, function(err: any) {
            if(err)
                return console.log(err);
            else {
            console.log("Written log");
            }}); 
        }
        else {
            let batTemp = result![0] + '.' + result![1];
            console.log(batTemp + 'else works');
        }

        // need '!' to remove null type of result
        let stringToNumber = result![0] + '.' + result![1];

        // converts string to floating point (+ operator)
        // var floatPointInt = +stringToNumber;
        // let batTemp = console.log(floatPointInt);
        // batTemp;

        // let tStamp = +result![2];
        // console.log(tStamp + 'tStamp');
        
        // need to convert back to string after comparison to write to log
        // let data = 'Error at: ';

        // if (fault = true) {
        //     const fs = require('fs');
        //     fs.writeFile("incidents.log", data, function(err: any) {
        //     if(err)
        //         return console.log('what');
        //     else {
        //     console.log("The file was saved!");
        //     }}); 
        // }

        // const fs = require('fs');
        // fs.writeFile("incidents.log", data, function(err: any) {
        // if(err)
        //     return console.log(err);
        // else {
        // console.log("The file was saved!");
        // }}); 


        // HINT: what happens if the JSON in the received message is formatted incorrectly?
        // HINT: see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
        let currJSON = JSON.stringify(msg.toString());
        
        // console.log(currJSON + 'test');
        // no way all I did was just change parse to stringify and it works? same result without try catch?

        websocketServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(msg.toString());
            }
          });
    });

    socket.on('end', () => {
        console.log('Closing connection with the TCP client');
    });
    
    socket.on('error', (err) => {
        console.log('TCP client error: ', err);
    });
});

websocketServer.on('listening', () => console.log('Websocket server started'));

websocketServer.on('connection', async (ws: WebSocket) => {
    console.log('Frontend websocket client connected to websocket server');
    ws.on('error', console.error);  
});

tcpServer.listen(TCP_PORT, () => {
    console.log(`TCP server listening on port ${TCP_PORT}`);
});

