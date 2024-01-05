import projectStyles from '../StyleSheets/Projects.module.css'

function ProjectDescription(props){
    return (
        <div className={projectStyles.projectDescription + " " + (props.show && projectStyles.show)}>
            <h2>{(props.info)["title"]}</h2>
            <p>{(props.info)["desc"]}</p>
        </div>
    );
}
export default ProjectDescription;