import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios'
import MainPage from './MainPage'
import DatePicker from './Date'
import {BASE_URL, API_KEY} from '../constants';

function App() {

  const [photo, setPhoto] = useState('')
  useEffect(() => {
    axios.get(`${BASE_URL}api_key=${API_KEY}`)
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
      <MainPage 
         photo={photo} 
         title={photo.title} 
         description={photo.explanation} 
         date={photo.date} 
         imageURL={photo.url}
      />
      <DatePicker />
    </div>
  );
}

export default App;
