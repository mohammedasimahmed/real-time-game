import React, { useEffect, useState } from 'react'
import "./App.css"
import Canvas from "./components/Canvas"
import { io } from "socket.io-client";
import drawLine from './components/drawLine';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
export default function App() {
  const [color, setColor] = useState("white")
  // const [rooms, setRooms] = useState("")
  const socket = io("http://localhost:5000")
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket.io server")
    })
    socket.on("receive_drawing", (data) => {
      const canvas = document.querySelector("canvas"); // Get the canvas element
      const ctx = canvas.getContext("2d");
      drawLine(data.prevPoint, data.point, ctx, '#000000', 5)
      data.prevPoint = data.point
      // console.log(data)
    })
    if(localStorage.getItem("room")){
      const room = localStorage.getItem("room")
      socket.emit("some_room",room)
    }
  }, [])

  function sendDrawing(ctx, point, prevPoint) {
    const room = localStorage.getItem("room")
    socket.emit("send_drawing", { point, prevPoint, room })
  }

  function handleRooms(room){
    if(localStorage.getItem("room")){
      const room = localStorage.getItem("room")
      socket.emit("leave_room",room)
      console.log("hi")
    }
    socket.emit("some_room",room)
    // setRooms(room)
    console.log("joining room "+room)
    localStorage.setItem("room",room)
    // navigate("/drawingBoard")
  }

  socket.on("abc", (data) => console.log(data))
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home 
        handleRooms={handleRooms} 
        />} />
        <Route path='/drawingBoard' element={     
        <Canvas 
        width={700}
        height={400}
        sendDrawing={sendDrawing}
        color={color}
        />
        } 
        />
      </Routes>
    </Router>
    </>

  );
}

