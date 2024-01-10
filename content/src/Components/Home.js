import appStyles from '../StyleSheets/App.module.css'
import homeStyles from '../StyleSheets/Home.module.css'
import React, {useRef, useState, useEffect} from 'react';
import CenterBuffer from './CenterBuffer';
function Home(props){
    const contentRef = useRef();
    const [contentHeight, setContentHeight] = useState(0);
    const pageRef = useRef();
    const [pageHeight, setPageHeight] = useState(0);

    useEffect(
        () => {
            const computedContentHeight = parseInt(( window.getComputedStyle(contentRef.current).getPropertyValue("height") ).replace("px", ""));
            setContentHeight(computedContentHeight);
            const computedPageHeight = parseInt(( window.getComputedStyle(pageRef.current).getPropertyValue("height") ).replace("px", ""));
            setPageHeight(computedPageHeight);
        }
    );
    
    return (
        <div ref={pageRef} className={appStyles.page + " " + props.position}>
            <CenterBuffer pageHeight={pageHeight} menuHeight={props.menuHeight} contentHeight={contentHeight}></CenterBuffer>
            <div className={appStyles.content} ref={contentRef}>
                <div className={homeStyles.home}>
                    <h1 className={homeStyles.hi}>{"Hi!"}</h1>
                    <div className={homeStyles.greeting}>
                        <h2 className={homeStyles.intro}> My name is Nathan, welcome to my website.</h2>
                        <p className={homeStyles.text}>Currently a Software Engineering student @ uWaterloo. Take a look at my work!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;