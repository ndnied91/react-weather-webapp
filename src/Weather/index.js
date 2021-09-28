import React, { Fragment } from "react";
import axios from "axios";
import "./weather.css";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = { day: "", image: "", high: 0, low: 0 };
  }

  convertToF(temp) {
    return parseInt((temp - 273.15) * 1.8) + 32;
  }

  componentDidMount() {
    const date = new Date();
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    const day = weekday[date.getDay()];

    const url = `http://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.REACT_APP_KEY}`;
    axios.get(url).then((response) => {
      this.setState({
        day: day,
        image: response.data.weather[0].icon,
        high: this.convertToF(response.data.main.temp_max),
        low: this.convertToF(response.data.main.temp_min),
      });
    });
  }

  render() {
    if (this.state.image) {
      return (
        <Fragment>
          <div id="day"> {this.state.day} </div>
          <img
            src={`http://openweathermap.org/img/wn/${this.state.image}@2x.png`}
            alt="Weather icon"
          />
          <div className="tempRanges">
            <p id="high"> {this.state.high}° </p>
            <p id="low"> {this.state.low}° </p>
          </div>
        </Fragment>
      );
    }
    return null;
  }
}

export default Weather;
