const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
const PORT = 3000;

server.listen(PORT);
let readyPlayerCount = 0;
io.on('connection', (socket) => {
    console.log('USER CONNECTED', socket.id);

    socket.on('ready', () => {
      console.log('Player Ready', socket.id);

      readyPlayerCount++;

      if(readyPlayerCount === 2){
        io.emit('startGame', socket.id);
      }
    });
})