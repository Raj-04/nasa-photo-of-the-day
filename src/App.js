import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios'
import Photo from './Photo'

function App() {

  const [photo, setPhoto] = useState('')
  useEffect(() => {
    axios.get('https://api.nasa.gov/planetary/apod?api_key=wRHDqDCRNPFIgPqVgisjlD9T4AlrQqRnbo25DqUq')
    .then(res =>{
      console.log(res.data)
      setPhoto(res.data)
    })
    .catch(err => {
      console.error(err)
    })
  }, [])

  return (
    <div className="App">
      <Photo 
         photo={photo} 
         title={photo.title} 
         description={photo.explanation} 
         date={photo.date} 
         imageURL={photo.url}
      />
    </div>
  );
}

export default App;
