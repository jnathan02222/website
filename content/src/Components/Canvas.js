import React, {useState, useEffect, useRef } from 'react';
import { Stage, Layer, Line, Circle } from 'react-konva';
import appStyles from '../StyleSheets/App.module.css'
import CanvasManager from './CanvasClasses/CanvasManager.js'

function Canvas(props){
    const gridWidth = 40;
    const color = "000"; //d2e0fc //ccffee
    const scribbleToGridRatio = 0.15;
    const [scribbles, setScribbles] = useState([]);
    const [endpoints, setEndpoints] = useState([]);
    const canvasManagerRef = useRef(new CanvasManager(gridWidth, 0.70, (props.dimensions)["height"]/(props.dimensions)["width"]));
    
    
      
    useEffect(() => {
        //Adjust based on dimensions
        let contentWidthPercent = 0.75;
        if((props.dimensions)["width"] < 1000){
            contentWidthPercent = 0.85;
        }
        (canvasManagerRef.current).reset(gridWidth, contentWidthPercent, (props.dimensions)["height"]/(props.dimensions)["width"]);

        //Animation code
        let animationFrameId;
        const animate = () => {
            (canvasManagerRef.current).step();
            (canvasManagerRef.current).updateHeight((props.dimensions)["height"]/(props.dimensions)["width"]);
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
        width={(props.dimensions)["width"]}
        height={(props.dimensions)["height"]}
        >
            <Layer>
                {scribbles.map((scribble, i) => (
                        //Scale to grid size
                    <Line points={(scribble.points).map(
                        (pos, i) => 
                        
                            pos*((props.dimensions)["width"]/gridWidth) + ((props.dimensions)["height"]/2) * (i%2)

                        )}
                        key={i}
                        stroke={color}
                        strokeWidth={2*((props.dimensions)["width"]/gridWidth)*scribbleToGridRatio} //((props.dimensions)["width"]/gridWidth)*scribbleToGridRatio
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
                            x={point.x *((props.dimensions)["width"]/gridWidth)}
                            y={point.y *((props.dimensions)["width"]/gridWidth) + ((props.dimensions)["height"]/2)}
                            radius={point.radius * ((props.dimensions)["width"]/gridWidth)*scribbleToGridRatio}
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