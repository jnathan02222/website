import appStyles from '../StyleSheets/App.module.css'
import aboutStyles from '../StyleSheets/About.module.css'
import placeholderImg from '../Files/1697997693941.jpg'
import React, {useRef, useState, useEffect} from 'react';
import CenterBuffer from './CenterBuffer';

function About(props){
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

                <div className={aboutStyles.about}> 
                    <div>
                        <h1 className={aboutStyles.title}>About</h1>
                        <br className={aboutStyles.break}/>
                        <p className={aboutStyles.text}>My name is Nathan. I’m a Software Engineering student at the University of Waterloo with a passion for <u>machine learning</u> and <u>web development.</u></p>
                        <br className={aboutStyles.break}/>
                        <p>In the past, I’ve leveraged my skills to help newcomers to Canada with Mana Immigration, developing websites and <a href="https://github.com/jnathan02222/wordpress-post-app">apps</a> to expand the business presence of our clients. I’ve also developed a rhythm-based <a href="https://dusk-music.glitch.me/">browser game</a> using the Spotify API.</p>
                        <br className={aboutStyles.break}/>
                        <p className={aboutStyles.text}>In my free time, I enjoy photography, sketching and learning to cook. I’m also looking for Summer 2024 internships, so if any of my <u onClick={()=>{(props.menuHandler)(2)}}className={aboutStyles.link}>past work</u> catches your interest, feel free to reach out!</p>
                    </div>
                    <img className={aboutStyles.image} src={placeholderImg} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default About;