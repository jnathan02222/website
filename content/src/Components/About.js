import appStyles from '../StyleSheets/App.module.css'
import aboutStyles from '../StyleSheets/About.module.css'
import placeholderImg from '../Files/placeholder.jpg'

function About(props){
    return (
        <div className={appStyles.page + " " + props.position}>
            <div className={aboutStyles.about}> 
                <div>
                    <h1 className={aboutStyles.title}>About</h1>
                    <br className={aboutStyles.break}/>
                    <p className={aboutStyles.text}>My name is Nathan. I’m a Software Engineering student at the University of Waterloo with a passion for <u>machine learning</u> and <u>web development.</u></p>
                    <br className={aboutStyles.break}/>
                    
                    <p className={aboutStyles.text}>In my free time, I enjoy photography, sketching and learning to cook. I’m also looking for Summer 2024 internships, so if any of my <u>past work</u> catches your interest, feel free to reach out!</p>
                </div>
                <img className={aboutStyles.image} src={placeholderImg} alt=""/>
            </div>
            
        </div>
    );
}

export default About;