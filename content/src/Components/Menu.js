import resume from '../Files/resume.pdf'
import menuStyles from '../StyleSheets/Menu.module.css'

function Menu(props){
    
    return (
        <div className={menuStyles.container}>
            <div className={menuStyles.menu}>
                <h2 onClick={()=>{(props.menuHandler)(0)}} className={menuStyles.menuItem + " " + (props.currentPage === 0 && menuStyles.selected)}>Home</h2>
                <h2 onClick={()=>{(props.menuHandler)(1)}} className={menuStyles.menuItem + " " + (props.currentPage === 1 && menuStyles.selected)}>About</h2>
                <h2 onClick={()=>{(props.menuHandler)(2)}} className={menuStyles.menuItem + " " + (props.currentPage === 2 && menuStyles.selected)}>Projects</h2>
                <h2 onClick={()=>{(props.menuHandler)(3)}} className={menuStyles.menuItem + " " + (props.currentPage === 3 && menuStyles.selected)}>Contact</h2>
                <h2 className={menuStyles.menuItem}><a tabIndex="-1" className={menuStyles.link} href={resume} >Resume</a></h2>

            </div>
        </div>
    );
}

export default Menu;