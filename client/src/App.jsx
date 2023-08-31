import React, { useEffect, useState } from 'react'
import "./App.css"
import Canvas from "./components/Canvas"
import { io } from "socket.io-client";
import drawLine from './components/drawLine';
export default function App() {
  const [color,setColor] = useState("white")
  const socket = io("http://localhost:5000")
  useEffect(()=>{
    socket.on("connect",()=>{
      // console.log("Connected to socket.io server")
    })
    socket.on("receive_drawing",(data)=>{
      const canvas = document.querySelector("canvas"); // Get the canvas element
      const ctx = canvas.getContext("2d");
      drawLine(data.prevPoint,data.point,ctx,'#000000',5)
      data.prevPoint=data.point
      // console.log(data)
    })
  },[])

  function sendDrawing(ctx, point, prevPoint){
    // console.log(ctx)
    socket.emit("send_drawing",{point, prevPoint})
  }

  socket.on("abc",(data)=>console.log(data))
  return (
    <div className="App"> 
      <input type="color" name="" id="" value={color} onChange={(e)=>setColor(e.target.value)} />
      <Canvas 
      width={700}
      height={400}
      sendDrawing={sendDrawing}
      color={color}
      />
      {/* <button onClick={sendEvent}>click</button> */}
    </div>

  );
}

