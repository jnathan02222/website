import React, {useRef, useEffect} from 'react'
//Rerenders on resize because App does 
function CenterBuffer(props){
    const div = useRef();
    useEffect(
        () => {

            (div.current).style.height = Math.max((props.pageHeight - props.contentHeight)/2, props.menuHeight) + "px";
        }
    );
    return (
        <div ref={div}></div>
    )
}
export default CenterBuffer;