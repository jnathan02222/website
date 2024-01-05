import appStyles from '../StyleSheets/App.module.css'
import homeStyles from '../StyleSheets/Home.module.css'

function Home(props){
    return (
        <div className={appStyles.page + " " + props.position}>
            <div className={homeStyles.home}>
                <h1 className={homeStyles.hi}>{"Hi!"}</h1>
                <div className={homeStyles.greeting}>
                    <h2 className={homeStyles.intro}> My name is Nathan, welcome to my website.</h2>
                    <p className={homeStyles.text}>Currently a Software Engineering student @ uWaterloo. Take a look at my work!</p>
                </div>
            </div>
        </div>
    );
}

export default Home;