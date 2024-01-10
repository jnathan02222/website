import appStyles from '../StyleSheets/App.module.css'
import React, {useRef, useEffect} from 'react'

//Rerenders on resize because App does 
function CenterBuffer(){
    const div = useRef();
    useEffect(
        () => {
            
        }
    );
    return (
        <div ref={div}></div>
    )
}
export default CenterBuffer;