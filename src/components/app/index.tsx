import React, { useEffect } from "react";
import './styles.css';
import {Header} from '../header/index';
import {ImageGallery} from '../imageGallery/index';

function App() {

  useEffect(() => {
      window.onscroll = function() {setHeaderFixed()};
  },[])

  const setHeaderFixed = ()=>{
    var header: HTMLElement = document.getElementById("stickyHeader") as HTMLElement;
    var sticky = header.offsetTop;

    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }

  return (
    <div className="App">
      <div >
        <div className={`headerContainer`} id={`stickyHeader`}>
            <Header />
        </div>
      <div className={`galleryContainer`}> 
            <ImageGallery />
      </div>
      </div>
    </div>
  );
}

export default App;
