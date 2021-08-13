import React, { useEffect, useState } from "react";
import './styles.css';
import {Header} from '../header/index';
import {ImageGallery} from '../imageGallery/index';
import { Button } from "react-bootstrap";

function App() {

  useEffect(() => {
      window.onscroll = function() {setHeaderFixed()};
  },[])

  const [searchKey, setSearchKey] = useState<string>("");

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
            <Header setSearchTag={(value) => setSearchKey(value)} />
        </div>
      <div className={`galleryContainer`}> 
            <ImageGallery searchTag={searchKey} />
      </div>
      </div>
    </div>
  );
}

export default App;
