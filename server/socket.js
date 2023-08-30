const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())

const io = require("socket.io")(5001,{
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
        socket.broadcast.emit("receive_drawing",data)
    })
})