import React, { useState } from 'react'
import Canvas from './Canvas'
import "../styles/login.css"
import { Link, useNavigate } from 'react-router-dom';

const Home = ({ handleRooms,
    isHost,
    setIsHost,
    val,
    setVal
}) => {
    const [room, setRoom] = useState("")
    const [noOfPeople, setNoOfPeople] = useState(1)
    const [noOfRounds, setNoOfRounds] = useState(1)
    const [room1, setRoom1] = useState("")
    const navigate = useNavigate()
    function HandleSubmit1(e, data) {
        e.preventDefault()
        handleRooms(data)
        setIsHost(true)
        setVal(true)
    }
    function HandleSubmit2(e, data) {
        e.preventDefault()
        handleRooms(data)
        setVal(true)
    }
    return (
        <div className="loginContainer">
            <center><h1 style={{ color: "white" }}>Draw and Guess</h1></center>
            <div className="backgroundLogin">
                <div className="LoginShape"></div>
                <div className="LoginShape"></div>
            </div>
            <div className="loginForm">
                <form action="" onSubmit={(e) => { HandleSubmit1(e, room); navigate("/drawingBoard") }}>
                    <label htmlFor="create_room" className="loginLabel"><h2>Create Room</h2></label>
                    <input required className="loginInput" type="text" placeholder="Create Room" id="create_room" value={room} onChange={(e) => setRoom(e.target.value)} />
                    <label htmlFor="no_of_player">Enter Maximum Number of Players</label>
                    <input min="1" max="8" required className="loginInput" type="number" id="no_of_player" value={noOfPeople} onChange={(e) => setNoOfPeople(e.target.value)} />
                    <label htmlFor="no_of_rounds">Enter Number of Rounds</label>
                    <input min="1" max="4" required className="loginInput" type="number" id="no_of_rounds" value={noOfRounds} onChange={(e) => setNoOfRounds(e.target.value)} />
                    <button className="login">Create Room</button>
                </form>
                <form action="" onSubmit={(e) => { HandleSubmit2(e, room1); navigate("/drawingBoard") }}>
                    <label htmlFor="join_room" className="loginLabel"><h2>Join Room</h2></label>
                    <input required className="loginInput" type="text" placeholder="Join Room" id="join_room" value={room1} onChange={(e) => setRoom1(e.target.value)} />
                    <button className="login">Join Room</button>
                </form>
            </div>
        </div>
    )
}

export default Home
