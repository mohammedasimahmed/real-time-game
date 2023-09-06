import { useEffect, useState } from 'react';
import { useOnDraw } from './Hooks';
import drawLine from './functions/drawLine';

const Canvas = ({
    width,
    height,
    sendDrawing,
    joinOnReload,
    handleAnswers
}) => {
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
                <div className="answersCont">

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
