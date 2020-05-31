import React from "react";
import Topsection from "./Topsection";
import Midsection from "./Midsection";


const API_key="9af22302fcc9e61a4f1b320749b26244"
class App extends React.Component{
constructor(){
  super();
  this.state={
    city:undefined,
    country:undefined,
    main:undefined,
    celsius:undefined,
    temp_max:undefined,
    temp_min:undefined,
    humidity:undefined,
    pressure:undefined,
    description:"",
    sunrise:undefined,
    sunset:undefined,
    speed:undefined,
    cloud:undefined,
    error:false
  };
 
}

calCelsius(temp){
  let c=Math.floor(temp-273.15);
  return c;
}

calhrmin(n){
        let day = n / (24 * 3600);       
        n = n % (24 * 3600); 
        let hour = n / 3600;       
        n %= 3600; 
        let minutes = n / 60 ;       
        n %= 60; 
        let seconds = n; 
        if(hour<10)
        return("0"+ hour.toString().split(".")[0] + ":"  + minutes.toString().split(".")[0] + ":" + seconds.toString()); 
        else if(minutes<10)
        return( hour.toString().split(".")[0] + ":0"  + minutes.toString().split(".")[0] + ":" + seconds.toString()); 
        else if(seconds<10)
        return( hour.toString().split(".")[0] + ":"  + minutes.toString().split(".")[0] + ":0" + seconds.toString()); 
        else
        return(hour.toString().split(".")[0] + ":"  + minutes.toString().split(".")[0] + ":" + seconds.toString()); 
        
}

capital(string){
   return(string[0].toUpperCase() + string.slice(1)); 
  
}

getWeather=async (e) =>{
  e.preventDefault();
  const city=e.target.elements.city.value;
  // const country='in';
  if(city){
  const api_call=await fetch("http://samples.openweathermap.org/data/2.5/weather?q=$(city),in&appid=70f846b34231239ba4dd4fc5f0e0fe8d");
  const response=await api_call.json();
  console.log(response);
  this.setState({
    city:response.name,
    country:response.sys.country,
    celsius: this.calCelsius(response.main.temp),
    temp_max:this.calCelsius(response.main.temp_max),
    temp_min:this.calCelsius(response.main.temp_min),
    pressure:response.main.pressure,
    humidity:response.main.humidity,
    sunrise:this.calhrmin(response.sys.sunrise),
    sunset:this.calhrmin(response.sys.sunset),
    speed:response.wind.speed,
    cloud:response.clouds.all,
    description:this.capital(response.weather[0].description)
  });
  }
  else{
this.setStateState({error:true})
  }
}

render(){
return(
  <div>
  <Topsection 
    loadweather={this.getWeather}
    error={this.state.error}
  />
  <Midsection 
    city={this.state.city}
    country={this.state.country} 
    temp_celsius={this.state.celsius}
    temp_max={this.state.temp_max}
    temp_min={this.state.temp_min}
    description={this.state.description}
    pressure={this.state.pressure}
    humidity={this.state.humidity}
    sunrise={this.state.sunrise}
    sunset={this.state.sunset}
    speed={this.state.speed}
    cloud={this.state.cloud}
   />
</div>
);
}
}


export default App;
 

