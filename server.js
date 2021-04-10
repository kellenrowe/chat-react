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

  // listens for someone typing
  socket.on("userIsTyping", (handle) => {
    io.in(roomName).emit("userIsTyping", handle);
  })
 
  // listens for typing end
  socket.on("userNotTyping", () => {
    io.in(roomName).emit("userNotTyping");
  })

  socket.on("disconnect", () => {
    socket.leave(roomName);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
