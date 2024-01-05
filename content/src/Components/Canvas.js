import React, {useState, useEffect, useRef } from 'react';
import { Stage, Layer, Line, Circle } from 'react-konva';
import appStyles from '../StyleSheets/App.module.css'
import CanvasManager from './CanvasClasses/CanvasManager.js'

function Canvas(props){
    const gridWidth = 40;
    const color = "#ccffee"; //d2e0fc
    const scribbleToGridRatio = 0.15;
    const [scribbles, setScribbles] = useState([]);
    const [endpoints, setEndpoints] = useState([]);
    const canvasManagerRef = useRef(new CanvasManager(gridWidth, 0.70, window.innerHeight/window.innerWidth));
    

    useEffect(() => {
        //Adjust based on dimensions
        let contentWidthPercent = 0.70;
        if(window.innerWidth < 1000){
            contentWidthPercent = 0.85;
        }
        (canvasManagerRef.current).reset(gridWidth, contentWidthPercent, window.innerHeight/window.innerWidth);

        //Animation code
        let animationFrameId;
        const animate = () => {
            (canvasManagerRef.current).step();
            (canvasManagerRef.current).updateHeight(window.innerHeight/window.innerWidth);
            setScribbles((canvasManagerRef.current).scribbleList);
            setEndpoints((canvasManagerRef.current).endpoints);
            animationFrameId = window.requestAnimationFrame(animate);
        }
        animate();



        //React interprets the return value as a function to call on unmount
        return () => {
            window.cancelAnimationFrame(animationFrameId); //Wacky that animationFrameId is not interpreted until function is called?
        }
    }, [props.dimensions]); //Only run on first render

    return (
        <Stage 
        className={appStyles.stage}
        width={window.innerWidth}
        height={window.innerHeight}
        >
            <Layer>
                {scribbles.map((scribble, i) => (
                     //Scale to grid size
                    <Line points={(scribble.points).map(
                        (pos, i) => 
                        
                            pos*(window.innerWidth/gridWidth) + (window.innerHeight/2) * (i%2)

                        )}
                        key={i}
                        stroke={color}
                        strokeWidth={2*(window.innerWidth/gridWidth)*scribbleToGridRatio} //(window.innerWidth/gridWidth)*scribbleToGridRatio
                        tension={0}
                        lineCap="round"
                        lineJoin="round"
                        opacity={1}
                        >
                    </Line>
                    ))
                }
                {endpoints.map(
                    (point, i) => (
                        <Circle
                            key={i}
                            x={point.x *(window.innerWidth/gridWidth)}
                            y={point.y *(window.innerWidth/gridWidth) + (window.innerHeight/2)}
                            radius={point.radius * (window.innerWidth/gridWidth)*scribbleToGridRatio}
                            fill={color}
                        >  
                        </Circle>
                    )
                )
                    
                }
            </Layer>
        </Stage>
    );
}

export default Canvas;