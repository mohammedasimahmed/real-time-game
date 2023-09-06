import React, { useEffect, useRef, useState } from 'react'
import "./App.css"
import Canvas from "./components/Canvas"
import { io } from "socket.io-client";
import drawLine from './components/functions/drawLine';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
export default function App() {
  const [isHost,setIsHost] = useState(false)
  const [val,setVal] = useState(false)
  const [socket,setSocket]=useState(io("http://localhost:5000"))
  const [answers,setAnswers] = useState([])
  const [players,setPlayers] = useState([])
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket.io server")
    })
    socket.on("receive_drawing", (data) => {
        const canvas = document.querySelector("canvas"); // Get the canvas element
        const ctx = canvas.getContext("2d");
        drawLine(data.prevPoint, data.point, ctx, '#000000', 5)
        data.prevPoint = data.point
    })

    socket.on("user_join", (data) => {
      console.log(data);
      // const players = document.querySelector(".playerList")
      // let newDiv = document.createElement("div")
      // newDiv.textContent="player"
      // players.appendChild(newDiv)
      setPlayers((player)=>[...player,"player"])
    });
    socket.on("obtainAns", (data) => {
        console.log(data);
        // let answersCont = document.querySelector(".answersCont")
        // let newDiv = document.createElement("div")
        // newDiv.textContent = data
        // answersCont.appendChild(newDiv)
        setAnswers((prevAns)=>[...prevAns,data])
    });
    

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
  }

  function joinOnReload(){
    if(localStorage.getItem("room")){
      const room = localStorage.getItem("room")
      console.log("hi")
      socket.emit("some_room",room)
      // const players = document.querySelector(".playerList")
      // let newDiv = document.createElement("div")
      // newDiv.textContent="player"
      // players.appendChild(newDiv)
      setPlayers((player)=>[...player,"player"])
    }
  }

  function handleAnswers(ans){
    const room = localStorage.getItem("room")
    socket.emit("send_ans",{ans,room})
  }
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home 
        handleRooms={handleRooms} 
        isHost={isHost}
        setIsHost={setIsHost}
        val={val}
        setVal={setVal}
        />} 
        />
        {
          val && <Route path='/drawingBoard' element=
            {     
              <Canvas 
                width={700}
                height={400}
                sendDrawing={sendDrawing}
                joinOnReload={joinOnReload}
                handleAnswers={handleAnswers}
                isHost={isHost}
                answers={answers}
                setAnswers={setAnswers}
                players={players}
                setPlayers={setPlayers}
              />
            } 
          />
        }
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
    </>

  );
}

