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
  const [appDimensions, setAppDimensions] = useState({});


  const pagePositions = useRef([appStyles.pageCurrent, appStyles.pageBelow, appStyles.pageBelow, appStyles.pageBelow]);

  

  function updateCanvas(){
    setAppDimensions({ }); //Create an object so state updates
  }

  useEffect(
    () => {

      window.addEventListener('resize', updateCanvas);
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
 
    <div className={appStyles.app}>
      <Menu currentPage={pageNum} menuHandler={handleMenu}></Menu>

      <Home position={(pagePositions.current)[0]} menuHandler={handleMenu}></Home>
      <About position={(pagePositions.current)[1]} menuHandler={handleMenu}></About>
      <Projects position={(pagePositions.current)[2]} menuHandler={handleMenu}></Projects>
      <Contact position={(pagePositions.current)[3]} menuHandler={handleMenu}></Contact>
      <Canvas dimensions={appDimensions}></Canvas>
    </div>
  
  );
}

export default App;


//Transitions
//Update position
//Apply transition