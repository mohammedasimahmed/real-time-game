import { useEffect, useState } from 'react';
import { useOnDraw } from './Hooks';
import drawLine from './functions/drawLine';

const Canvas = ({
    width,
    height,
    sendDrawing,
    joinOnReload,
    handleAnswers,
    isHost,
    answers,
    setAnswers,
    players,
    setPlayers
}) => {
    const [msg,setMsg] = useState("")
    useEffect(() => {
        joinOnReload()
    }, [])

    const {
        setCanvasRef,
        onCanvasMouseDown
    } = useOnDraw(onDraw);

    function onDraw(ctx, point, prevPoint) {
        if(isHost){
            sendDrawing(ctx, point, prevPoint)
            drawLine(prevPoint, point, ctx, '#000000', 5);
        }
    }
    function handleSubmit(e){
        e.preventDefault()
        // let msg = document.querySelector(".answerInput").value
        // let answersCont = document.querySelector(".answersCont")
        // let newDiv = document.createElement("div")
        // newDiv.textContent = msg
        // answersCont.appendChild(newDiv)
        setAnswers((prevAns)=>[...prevAns,msg])
        handleAnswers(msg)
        setMsg("")
        // document.querySelector(".answerInput").value = ""
    }
    return (
        <div className='canvPage'>
            <div className='playerList'>
                {/* {
                    players.map((player,idx)=>{
                        return (
                            <div key={idx}>{player}</div>
                        )
                    })
                } */}
            </div>
            <div className='canvCont'>
                <canvas
                    width={width}
                    height={height}
                    onMouseDown={onCanvasMouseDown}
                    style={canvasStyle}
                    ref={setCanvasRef}
                />
            </div>
            <div className='answers'>
                <div>Live Chat</div>
                <div className="answersCont">
                    {
                        answers.map((ans,idx)=>{
                            return (
                                <div key={idx}>{ans}</div>
                            )
                        })
                    }
                </div>
                <form action="" onSubmit={(e)=>handleSubmit(e)}>
                    <input 
                    type="text" 
                    className='answerInput' 
                    value={msg}
                    onChange={(e)=>setMsg(e.target.value)}
                    />
                </form>
            </div>
        </div>
    );

}

export default Canvas;

const canvasStyle = {
    border: "1px solid black"
}
