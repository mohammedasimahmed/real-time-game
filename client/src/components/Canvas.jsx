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
