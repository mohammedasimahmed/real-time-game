import {useOnDraw} from './Hooks';
import drawLine from './drawLine';

const Canvas = ({
    width,
    height,
    sendDrawing
}) => {
    
    const {
        setCanvasRef,
        onCanvasMouseDown
    } = useOnDraw(onDraw);

    function onDraw(ctx, point, prevPoint) {
        sendDrawing(ctx, point, prevPoint)
        drawLine(prevPoint, point, ctx, '#000000', 5);
    }

    // for(let i=0;i<10;i++){
    //     const ctx = canvasRef.current.getContext('2d');
    //     onDraw(ctx,100+i,100)
    // }



    return(
        <canvas
            width={width}
            height={height}
            onMouseDown={onCanvasMouseDown}
            style={canvasStyle}
            ref={setCanvasRef}
        />
    );

}

export default Canvas;

const canvasStyle = {
    border: "1px solid black"
}

// import React from 'react'
// import { useOnDraw } from './Hooks'

// const Canvas = ({width,height}) => {
//     const setCanvasRef = useOnDraw(onDraw)

//     function onDraw(ctx,point){
//         ctx.fillStyle = "#000000"
//         ctx.beginPath()
//         ctx.arc(point.x,point.y, 5, 0, 2 * Math.PI)
//         ctx.fill()
//     }
//   return (
//     <canvas 
//     height={height}
//     width={width}
//     style={{border:"2px solid black"}}
//     ref={setCanvasRef}
//     />
//   )
// }

// export default Canvas
