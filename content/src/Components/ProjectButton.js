import projectStyles from '../StyleSheets/Projects.module.css'
import React, {useState, useEffect} from 'react'

function ProjectButton(props){
    const [info, setInfo] = useState(props.initialInfo);
    const [show, setShow] = useState(true);

    useEffect(
        () => {
            if(!show){
                setShow(true);
            }
        }
        , [show]);

    function handleClick (){
        //When clicked, swap this project's info with the currently focused project's info
        let tmp = props.focusedInfo;
        (props.clickHandler)(info);
        setInfo(tmp);
        //Hide
        setShow(false);
    }


    return (
        <div onClick={handleClick} className={projectStyles.button + " " + (show && projectStyles.show)}>{info["title"]}</div>
    );
}

export default ProjectButton;