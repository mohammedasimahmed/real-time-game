import {useOnDraw} from './Hooks';
import drawLine from './drawLine';

const Canvas = ({
    width,
    height,
    sendDrawing,
    color
}) => {
    const {
        setCanvasRef,
        onCanvasMouseDown
    } = useOnDraw(onDraw);

    function onDraw(ctx, point, prevPoint) {
        sendDrawing(ctx, point, prevPoint)
        drawLine(prevPoint, point, ctx, '#000000', 5);
    }

    return(
        <div className='canvCont'>
        <input type="color" name="" id="" value={color} onChange={(e)=>setColor(e.target.value)} />
        <canvas
            width={width}
            height={height}
            onMouseDown={onCanvasMouseDown}
            style={canvasStyle}
            ref={setCanvasRef}
            />
        </div>
    );

}

export default Canvas;

const canvasStyle = {
    border: "1px solid black"
}
