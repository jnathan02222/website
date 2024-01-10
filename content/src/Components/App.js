import Home from './Home.js'
import About from './About.js'
import Projects from './Projects.js'
import Contact from './Contact.js'
import Canvas from './Canvas.js'
import appStyles from '../StyleSheets/App.module.css'
import React, {useState, useRef, useEffect} from 'react'
import Menu from '../Components/Menu.js'
function App() {
  const [pageNum, setPageNum] = useState(0);
  const [appDimensions, setAppDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [menuHeight, setMenuHeight] = useState(0);
  const appRef = useRef();
  const menuRef = useRef();

  const pagePositions = useRef([appStyles.pageCurrent, appStyles.pageBelow, appStyles.pageBelow, appStyles.pageBelow]);
  
  function resizeHandler(){
    updateCanvas();
    const computedMenuHeight = parseInt(( window.getComputedStyle(menuRef.current).getPropertyValue("height") ).replace("px", ""));
    setMenuHeight(computedMenuHeight);
  }

  function updateCanvas(){
    const appWidth = parseInt(( window.getComputedStyle(appRef.current).getPropertyValue("width") ).replace("px", ""));
    const appHeight = parseInt(( window.getComputedStyle(appRef.current).getPropertyValue("height") ).replace("px", ""));

    setAppDimensions({ width: appWidth, height: appHeight}); //Create an object so state updates
  }
  
  //Future fix? Move to Canvas component so the whole thing doesn't rerender constantly on resize
  useEffect(
    () => {
      
      window.addEventListener('resize', resizeHandler);
      resizeHandler();
    }
  ,[]);

  function handleMenu(newPageNum) {
    if(newPageNum === pageNum){
      return;
    }

    (pagePositions.current)[newPageNum] = appStyles.pageCurrent + " " + appStyles.transition;
    for(let i = 0; i < newPageNum; i++){
      (pagePositions.current)[i] = appStyles.pageAbove;
    }
    for(let i = newPageNum + 1; i < (pagePositions.current).length; i++){
      (pagePositions.current)[i] = appStyles.pageBelow;
    }
    //If new page is below current page (index is greater), push the current page up
    if(newPageNum > pageNum){
      (pagePositions.current)[pageNum] = appStyles.pageAbove  + " " + appStyles.transition;
    //Otherwise, move it up
    }else{
      (pagePositions.current)[pageNum] = appStyles.pageBelow  + " " + appStyles.transition;
    }
    
  
    setPageNum(newPageNum);
    updateCanvas();
    }

  return (
 
    <div ref={appRef} className={appStyles.app}>
      <div ref={menuRef} className={appStyles.menu}>
        <Menu currentPage={pageNum} menuHandler={handleMenu}></Menu>
      </div>
      <Home menuHeight={menuHeight} position={(pagePositions.current)[0]} menuHandler={handleMenu}></Home>
      <About menuHeight={menuHeight} position={(pagePositions.current)[1]} menuHandler={handleMenu}></About>
      <Projects menuHeight={menuHeight} position={(pagePositions.current)[2]} menuHandler={handleMenu}></Projects>
      <Contact menuHeight={menuHeight} position={(pagePositions.current)[3]} menuHandler={handleMenu}></Contact>
      <Canvas menuHeight={menuHeight} dimensions={appDimensions}></Canvas>
    </div>
  
  );
}

export default App;


//Transitions
//Update position
//Apply transition