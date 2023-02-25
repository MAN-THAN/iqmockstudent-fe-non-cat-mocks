import React,{useRef} from 'react'
import CenterMain from './CenterMain'
import Header from './Header'

function Main() {


  const fullscreenRef = useRef(null);

  const handleFullscreenClick = () => {
  console.log("gvhbjnkm")
  const element = fullscreenRef.current;

  if (element.requestFullscreen) {
    element.requestFullscreen();
  }
};


  return (
    <div ref={fullscreenRef}>
        <Header/>
        <CenterMain  fullScreen={handleFullscreenClick}/>
    </div>
  )
}

export default Main


