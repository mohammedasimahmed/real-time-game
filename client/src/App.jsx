import React, { useEffect, useRef, useState } from 'react'
import "./App.css"
import Canvas from "./components/Canvas"
import { io } from "socket.io-client";
import drawLine from './components/functions/drawLine';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import { handlePlayers } from './components/functions/handlePlayers';
export default function App() {
  const [color, setColor] = useState("white")
  // const {_,managePlayers} = handlePlayers()
  const [players,setPlayers] = useState(["player"])
  const [answers,setAnswers] = useState(["football"])
  const socket = io("http://localhost:5000")
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket.io server")
    })
    socket.on("receive_drawing", (data) => {
      if(data.prevPoint && data.point){
        const canvas = document.querySelector("canvas"); // Get the canvas element
        const ctx = canvas.getContext("2d");
        drawLine(data.prevPoint, data.point, ctx, '#000000', 5)
        data.prevPoint = data.point
      }
      else {
        console.log(data);
        let answersCont = document.querySelector(".answersCont")
        let newDiv = document.createElement("div")
        newDiv.textContent = data
        answersCont.appendChild(newDiv)
        // setAnswers((prevAns) => [...prevAns, data]);
      }
      // console.log(data)
    })

    socket.on("user_join", (data) => {
      console.log(data);
      // setPlayers((prevPlayers) => [...prevPlayers, "player"]);
      const players = document.querySelector(".playerList")
      let newDiv = document.createElement("div")
      newDiv.textContent="player"
      players.appendChild(newDiv)
    });
    // socket.on("obtainAns", (data) => {
    //   console.log(data);
    //   setAnswers((prevAns) => [...prevAns, data]);
    // });
    

  }, [])

  function sendDrawing(ctx, point, prevPoint) {
    const room = localStorage.getItem("room")
    socket.emit("send_drawing", { point, prevPoint, room })
  }

  function handleRooms(room){
    if(localStorage.getItem("room")){
      const room1 = localStorage.getItem("room")
      socket.emit("leave_room",room1)
      console.log("hi")
      localStorage.setItem("room",room)
    }
    // socket.emit("some_room",room)
    // setRooms(room)
    // console.log("joining room "+room)
    // navigate("/drawingBoard")
  }

  function joinOnReload(){
    if(localStorage.getItem("room")){
      const room = localStorage.getItem("room")
      // socket.emit("leave_room",room)
      console.log("hi")
      socket.emit("some_room",room)
      const players = document.querySelector(".playerList")
      let newDiv = document.createElement("div")
      newDiv.textContent="player"
      players.appendChild(newDiv)
    }
  }

  function handleAnswers(ans){
    const room = localStorage.getItem("room")
    // socket.emit("leave_room",room)
    socket.emit("send_drawing",{ans,room})
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
        joinOnReload={joinOnReload}
        players={players}
        answers={answers}
        handleAnswers={handleAnswers}
        />
        } 
        />
      </Routes>
    </Router>
    </>

  );
}

