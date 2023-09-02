import { useState } from "react";

export function handlePlayers (){
    const [players,setPlayers] = useState([])
    function managePlayers(data){
        setPlayers([...players,data])
    }
    return {
        players,
        managePlayers
    }
}