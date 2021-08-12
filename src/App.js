import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios'
import MainPage from './MainPage'
import DatePicker from './Date'
import {BASE_URL, API_KEY} from './constants';
import Dropdown from './Dropdown';

function App() {

  const list = [];

  const current = {
    year: new Date().getFullYear().toString(),
    month: (new Date().getMonth() + 1).toString().match(/^[0-9]$/) ? '0' + (new Date().getMonth() + 1).toString() : (new Date().getMonth() + 1).toString(),
    day: new Date().getDate().toString()
  };

  for (let i = 1; i <= current.day; i++) {
    list.push(i.toString().match(/^[0-9]$/) ? '0' + i.toString() : i.toString());
  }

  list.push(current.day.toString().match(/^[0-9]$/) ? '0' + current.day.toString() : current.day.toString());

  const [data, setData] = useState([]);

  const [date, setDate] = useState(`${current.year}-${current.month}-${list.pop()}`);

  const [fallback, setFallback] = useState(null);

  const APOD = new URL('/planetary/apod', 'https://api.nasa.gov');

  useEffect(() => {

    APOD.search = new URLSearchParams({ api_key: API_KEY, date: date  });

    axios.get(encodeURI(APOD.href)).then((Res) => {

      if (Res.data && !Res.data.url.includes('https://apod.nasa.gov/apod/image')) {
        throw new Error(`No image of the day for ${date}.`);
      }

      setFallback(date);

      setData(Res.data);

    }).catch((Err) => {

      setDate(fallback);

      console.log(Err);

    });
  }, [date]);


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
      {Dropdown({ date, setDate, list, current })}
      <DatePicker />
    </div>
  );
}

export default App;
