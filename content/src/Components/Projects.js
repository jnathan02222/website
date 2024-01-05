import ProjectDescription from './ProjectDescription.js';
import ProjectButton from './ProjectButton.js';
import appStyles from '../StyleSheets/App.module.css'
import projectsStyles from '../StyleSheets/Projects.module.css'
import React, {useState, useEffect} from 'react'

function Projects(props){
    //Note, you can also use HTML in the description (the wonders of JSX!)
    const [focusedProjectInfo, setFocusedProjectInfo] = useState({title: "Dusk", desc: "Dusk is a browser game written in Java and converted to JavaScript using Greenfoot. With the integration of the Spotify API, users can input any song on Spotify and generate a level to beat. The project was completed over two weeks with a team of 5 fellow classmates under my leadership. Due to terms of use limitations, only a demo is available online."});
    const [showFocused, setShowFocused] = useState(true);

    useEffect(
        () => {
            if(!showFocused){
                setShowFocused(true);
            }
        }
    , [showFocused]);

    function handleClick(newProjectInfo) {   
        setFocusedProjectInfo(newProjectInfo);
        setShowFocused(false);
    }

    return (
        <div className={appStyles.page + " " + props.position}>
            <div className={projectsStyles.projects}>
                <h1>Projects</h1>
                <br/>
                <div className={projectsStyles.projectWidget}>
                    
                    <ProjectDescription show={showFocused} info={focusedProjectInfo}></ProjectDescription>
                    
                    <div className={projectsStyles.buttonWidget}>

                        <ProjectButton clickHandler={handleClick} focusedInfo={focusedProjectInfo} initialInfo={{title: "Kirbot", desc: "Kirbot is a Discord Bot capable of setting reminders, telling the weather and classifying photos using Clarafai image recognition."}}></ProjectButton>
                        <ProjectButton clickHandler={handleClick} focusedInfo={focusedProjectInfo} initialInfo={{title: "DECA Tester", desc: "In my final year of high school, I developed a program to help my practice DECA multiple choice questions. By parsing text files for questions and answers, it provides a quick and effective way to practice recalling essential business concepts. This program helped me attain an award for top 10 in multiple choice at the provincial level."}}></ProjectButton>
                        <ProjectButton clickHandler={handleClick} focusedInfo={focusedProjectInfo} initialInfo={{title: "Mana Immigration", desc: "During my time at Mana Immigration, I designed 3 websites for newcomers to Canada looking to expand their businesses. I also developed a prototype React Native app that pulls posts from these websites using the WordPress API, displaying them for potential users."}}></ProjectButton>
                    </div>   
                </div>  
            </div>
        </div>
    );
}

export default Projects;