const express = require("express")
const cors = require("cors")
const http = require("http")
const app = express()
const server = http.createServer(app)

app.use(cors())
// require("./socket.js")
const io = require("socket.io")(server,{
    cors:{
        origin:"http://localhost:5173"
    }
})

io.on("connection",(socket)=>{
    console.log("connected with client")
    socket.on("to_everyone",(data)=>{
        socket.broadcast.emit("abc",data)
    })
    socket.on("send_drawing",(data)=>{
        // socket.broadcast.emit("receive_drawing",data)
        socket.to(data.room).emit("receive_drawing",data)
        console.log("sent data to "+data.room)
    })
    socket.on("some_room",(data)=>{
        if(data!==""){
            socket.join(data)
            console.log("joined room "+data)
            socket.to(data).emit("user_join","someone joined")
        }
    })
    socket.on("leave_room",(data)=>{
        console.log("hi")
        socket.leave(data);
        console.log("left room "+data)
    })
    // socket.on("leave_room", (data) => {
    //     const socketId = socket.id;
    //     const rooms = Object.keys(socket.rooms);
      
    //     rooms.forEach((room) => {
    //       if (room !== socketId) {
    //         // Leave the room (excluding the socket's own ID room)
    //         socket.leave(room);
    //         console.log(`Left room ${room}`);
    //       }
    //     });
    //   });
      
    
})
app.get("/",(req,res)=>{
    res.send("hello")
})


server.listen(5000,()=>console.log("Server started at port 5000"))