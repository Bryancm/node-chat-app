const path = require("path");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

var { generateMessage, generateLocationMessage } = require("./utils/message");
const { isRealString } = require("./utils/validation");
const { Users } = require("./utils/users");
const publicPath = path.join(__dirname, "../public");

const port = process.env.PORT || 3001;
var app = express();
var server = http.createServer(app);
var io = new Server(server, {
  transport: ["websocket"],
  cors: {
    origin: "*",
  },
});
var users = new Users();
// console.log(io);
app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("join", (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback("Name and room name are required");
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room, params.url);

    io.to(params.room).emit("updateUserList", users.getUserList(params.room));
    //socket.leave('name of the room')

    //io.emit -> io.to('name of the room').emit
    //socket.broadcast.emit -> socket.broadcast.to('name of the room')

    socket.emit(
      "newMessage",
      generateMessage("Admin", "Welcome to the chat app")
    );

    socket.broadcast
      .to(params.room)
      .emit(
        "newMessage",
        generateMessage("Admin", `${params.name} has joined`)
      );
    callback();
  });

  socket.on("createMessage", (message, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit(
        "newMessage",
        generateMessage(user.name, message.text, socket.id, user.url)
      );
    }

    callback();
  });

  socket.on("createLocationMessage", (coords) => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "newLocationMessage",
        generateLocationMessage(user.name, coords.latitude, coords.longitude)
      );
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("updateUserList", users.getUserList(user.room));
      io.to(user.room).emit(
        "newMessage",
        generateMessage("Admin", `${user.name} has left`)
      );
    }
  });
});

server.listen(port, () => {
  console.log("Server listen on port ", port);
});
