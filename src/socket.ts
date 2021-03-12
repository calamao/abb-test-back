/* eslint-disable */
import * as socketio from "socket.io";
import { generateRandomPart } from "./models/test-data/part-data";

export function initSocket(httpServer: any) {
  let io = require("socket.io")(httpServer, {
    cors: {
      origin: '*'
    }
  });

  let activeSockets: socketio.Socket[] = [];

  //Whenever someone connects this gets executed
  io.on('connection', function(socket: socketio.Socket) {
    console.log('A user connected');
    activeSockets.push(socket);

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
      console.log('A user disconnected');

      // remove this socket from active
      activeSockets = activeSockets.filter(s => s !== socket);
    });

    // if (!startEmitting) {
    //   generateMockPartPush(socket);
    //   startEmitting = true;
    // }

  });

  generateMockPartPush();

  function generateMockPartPush() {
    setInterval(_ => {
      const data = [generateRandomPart()];
      activeSockets.forEach(socket => socket.emit('part', data));
    }, 10000);
  }

}




