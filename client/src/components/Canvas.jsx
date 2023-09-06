import { useEffect, useState } from 'react';
import { useOnDraw } from './Hooks';
import drawLine from './functions/drawLine';
import { handlePlayers } from './functions/handlePlayers';

const Canvas = ({
    width,
    height,
    sendDrawing,
    color,
    joinOnReload,
    players,
    answers,
    handleAnswers
}) => {
    // const {players,_} = handlePlayers()
    useEffect(() => {
        joinOnReload()
    }, [])

    const {
        setCanvasRef,
        onCanvasMouseDown
    } = useOnDraw(onDraw);

    function onDraw(ctx, point, prevPoint) {
        sendDrawing(ctx, point, prevPoint)
        drawLine(prevPoint, point, ctx, '#000000', 5);
    }
    function handleSubmit(e){
        e.preventDefault()
        let msg = document.querySelector(".answerInput").value
        let answersCont = document.querySelector(".answersCont")
        let newDiv = document.createElement("div")
        newDiv.textContent = msg
        answersCont.appendChild(newDiv)
        handleAnswers(msg)
        document.querySelector(".answerInput").value = ""
    }
    return (
        <div className='canvPage'>
            <div className='playerList'>
                {/* {
                    players.map((player, idx) => {
                        return (
                            <div key={idx}>{player + idx}</div>
                        )
                    })
                } */}
            </div>
            <div className='canvCont'>
                {/* <input type="color" name="" id="" value={color} onChange={(e) => setColor(e.target.value)} /> */}
                <canvas
                    width={width}
                    height={height}
                    onMouseDown={onCanvasMouseDown}
                    style={canvasStyle}
                    ref={setCanvasRef}
                />
            </div>
            <div className='answers'>
                <div className="answersCont">
                    {/* {
                        answers.map((ans,idx) => {
                            return (
                                <div key={idx}>{ans}</div>
                            )
                        })
                    } */}
                </div>
                <form action="" onSubmit={(e)=>handleSubmit(e)}>
                    <input 
                    type="text" 
                    className='answerInput' 
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
