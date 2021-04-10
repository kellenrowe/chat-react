const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 8000;

io.on("connection", (socket) => {
  // Join a conversation
  const { roomName } = socket.handshake.query;
  socket.join(roomName);

  // Listen for new messages
  socket.on("newChat", (data) => {
    io.in(roomName).emit("newChat", data);
  });

  socket.on("userIsTyping", (handle) => {
    console.log('reached usertyping on server :>> ');
    io.in(roomName).emit("userIsTyping", handle);
  })
 
  socket.on("userNotTyping", () => {
    console.log('reached NOTtyping on server :>> ');
    io.in(roomName).emit("userNotTyping");
  })

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomName);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
