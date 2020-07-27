
module.exports = connectSockets

function connectSockets(io) {
    console.log('connect');
    io.on('connection', socket => {
        console.log('connected');
        socket.on('chat newMsg', msg=>{
            io.emit('chat addMsg', msg)
        })
        socket.on("typing user", (msg) => {
            io.emit('show Typing', msg)
          });
    })
}