// require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
// require("./config/config.js")
const app = express();
const server = http.createServer(app);
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://mohammedasimahmed:mohammedasimahmed@cluster.j4763f2.mongodb.net/real_time_game?retryWrites=true&w=majority"
  )
  .then(()=>{
    console.log("connected")
  });

app.use(cors());

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("connected with client");
  socket.on("send_drawing", (data) => {
    socket.to(data.room).emit("receive_drawing", data);
    console.log(data.room);
    console.log("sent data to " + data.room);
  });
  socket.on("send_ans", (data) => {
    console.log(data.room);
    socket.to(data.room).emit("obtainAns", data.ans);
    console.log("sent answer to " + data.room);
  });

  socket.on("some_room", (data) => {
    if (data !== "") {
      socket.join(data);
      console.log("joined room " + data);
      const room = io.sockets.adapter.rooms;
      console.log(socket.id);
      console.log(socket.rooms);
      console.log("wdvkdwjv");
      console.log(room);
      socket.to(data).emit("user_join", "someone joined");
    }
  });
  socket.on("leave_room", (data) => {
    console.log("hi");
    socket.leave(data);
    console.log("left room " + data);
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});
app.get("/", (req, res) => {
  res.send("hello");
});

server.listen(5000, () => console.log("Server started at port 5000"));
