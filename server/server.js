const path = require("path");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const { mongoose } = require("./db/index");

var { generateMessage, getMessageList } = require("./utils/message");
const { isRealString } = require("./utils/validation");
const { Users } = require("./utils/users");
const publicPath = path.join(__dirname, "../public/build");

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

app.use(express.static(publicPath));
app.get("/*", (req, res, next) => {
  res.sendFile("index.html", {
    root: publicPath,
  });
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("join", async (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback("Name and room name are required");
    }

    socket.join(params.room);
    await users.removeUser(socket.id);
    await users.addUser(socket.id, params.name, params.room, params.url);
    const usersList = await users.getUserList(params.room);
    io.to(params.room).emit("updateUserList", usersList);

    socket.broadcast
      .to(params.room)
      .emit(
        "newMessage",
        await generateMessage(
          "Admin",
          `${params.name} has joined`,
          `1`,
          "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png",
          params.room
        )
      );
    callback();
  });

  socket.on("createMessage", async (message, callback) => {
    var user = await users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit(
        "newMessage",
        await generateMessage(
          user.name,
          message.text,
          socket.id,
          user.url,
          user.room
        )
      );
    }
    callback();
  });

  socket.on("getMessagesList", async (room, callback) => {
    const messages = await getMessageList(room);
    callback(messages);
  });

  socket.on("disconnect", async () => {
    console.log("user disconnected");
    var user = await users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "updateUserList",
        await users.getUserList(user.room)
      );
      io.to(user.room).emit(
        "newMessage",
        await generateMessage(
          "Admin",
          `${user.name} has left`,
          "1",
          "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png",
          user.room
        )
      );
    }
  });
});

server.listen(port, () => {
  console.log("Server listen on port ", port);
});
