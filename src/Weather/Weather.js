import React from 'react'

import axios from 'axios'

import './weather.css'


import { key }  from '../keys.js'

class Weather extends React.Component{

    constructor(props) {
    super(props)
      this.state = {day: null , image: null , high: null , low: null }
      // this.onInputchange = this.onInputchange.bind(this);
  }



  convertToF(temp){
      return parseInt((temp-273.15)*1.8)+32
  }

  async componentDidMount(){


    var d = new Date();
        var weekday = new Array(7);
        weekday[0] = "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thur";
        weekday[5] = "Fri";
        weekday[6] = "Sat";

      var day = weekday[d.getDay()];

      const url = `http://api.openweathermap.org/data/2.5/weather?q=London&appid=${key}`
      const weather = await axios.get(url)

      let image = weather.data.weather[0].icon
      let high = this.convertToF(weather.data.main.temp_max)  //kelvin to ferenheit
      let low = this.convertToF(weather.data.main.temp_min) //kelvin to ferenheit

      this.setState({ day, image, high, low})
  }










  render(){

    const renderData=()=>{
      if(this.state.image){
           return(
             <div>
               <div>
                  <div id="day"> {this.state.day} </div>
                  <img src= {`http://openweathermap.org/img/wn/${this.state.image}@2x.png`} />

                  <div className="tempRanges">
                    <p id="high"> {this.state.high}° </p>
                    <p id="low"> {this.state.low}° </p>
                  </div>

               </div>
             </div>
         )
      }
      else{
        return null
      }

    }


    return(
      <div> {renderData()} </div>
    )
  }
}


export default Weather
