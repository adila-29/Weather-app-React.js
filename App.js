import wallpaper from "./Assets/wallpaper.jpg";
import axios from 'axios';
import './App.css';
import { useEffect, useState } from "react";

function App() {

  const apikey= "166ff51dcac3920fb99fdb67fdff779e";
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({});

  const getWeatherDetails = (cityName) =>{
    if (!cityName) return
    const apiURL= "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=" + apikey;
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
      setData(res.data)
    }).catch((err) => {
      console.log("err",err)
    })
  }


  const handleChangeInput = (e) => {
    setInputCity(e.target.value)

  }


  const handleSearch = () =>{
    getWeatherDetails(inputCity)
  }

  useEffect(() => {
    getWeatherDetails()
  },[])


  return (
    <div className='app' style={{ backgroundImage: `url(${wallpaper})`}}>
      <div className='weatherbg'>
        <h1 className="heading">Weather App</h1>
        <div className="search">
          <input type="text" className="form" placeholder="Type a City name.." 
          value={inputCity}
          onChange={handleChangeInput}/>
          <button className="search" type="button"
          onClick={handleSearch}
          >Search</button>
        </div>
      </div>

      <div className="bottomcontainer">
        <div className="resultbox">
            <img className="weathericon" src="https://icons.iconarchive.com/icons/iynque/ios7-style/1024/Weather-icon.png" />
            <h5 className="city">{data?.name}</h5>
            <h6 className="temp">{((data?.main?.temp) - 273.15).toFixed(2)} °C</h6>
        </div>
      </div>
    </div>
  );
}

export default App;
