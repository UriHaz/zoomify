
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('chat newMsg', msg=>{
            console.log(msg)
            io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            // io.to(socket.myTopic).emit('chat addMsg', msg)
        })
        socket.on("typing user", (msg) => {
            console.log('name and txt in socket');
            console.log(msg.from);
            console.log(msg.txt);
            io.emit('show Typing', msg)
          });
    })
}