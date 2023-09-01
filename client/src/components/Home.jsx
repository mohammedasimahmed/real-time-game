import React, { useState } from 'react'
import Canvas from './Canvas'
import { Link , useNavigate} from 'react-router-dom';

const Home = ({handleRooms
    // ,width,height,sendDrawing,color
}) => {
    const [room, setRoom] = useState("")
    const navigate = useNavigate()
    function HandleSubmit(e){
        e.preventDefault()
        handleRooms(room)
    }
    return (
        <div>
            <form action="" onSubmit={(e)=>{HandleSubmit(e);navigate("/drawingBoard")}}>
                <input type="text" value={room} onChange={(e)=>setRoom(e.target.value)} />
                <button type='submit'>Join Room</button>
            </form>
            {/* <Link to="/drawingBoard"> */}
            {/* </Link> */}
        </div>
    )
}

export default Home
