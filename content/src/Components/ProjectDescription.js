import projectStyles from '../StyleSheets/Projects.module.css'
function ProjectDescription(props){
    return (
        <div className={projectStyles.projectDescription + " " + (props.show && projectStyles.show)}>
            <div className={projectStyles.content}>
                <h2>{(props.info)["title"]}</h2>
                <div><i>{(props.info)["tools"]}</i></div>
                <br/>
                <div>{(props.info)["desc"]}</div>
            </div>
            <div className={projectStyles.imageDiv}>
                 {(props.info)["image"] != null && <img alt="background" className={projectStyles.projectImage} src={(props.info)["image"]}></img>}
            </div>
        </div>
    );
}
export default ProjectDescription;