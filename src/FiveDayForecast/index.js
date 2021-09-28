import React from "react";
import axios from "axios";
import "./fiveDayWeather.css";

class FiveDayForeCast extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temps: [] };
  }

  mode = (
    array //this function finds the most common string in an array
  ) =>
    array.reduce(
      (a, b, i, arr) =>
        arr.filter((v) => v === a).length >= arr.filter((v) => v === b).length
          ? a
          : b,
      null
    );

  getMaxIcon = (item) => {
    let ret = new Map();
    item.forEach((item, date) => {
      let str = item.split(" "); //splits string
      let icon = this.mode(str); //returns the most common icon
      ret.set(date, icon);
    });

    return ret; //returns a map
  };

  convertToF(temp) {
    return parseInt((temp - 273.15) * 1.8) + 32;
  }

  async componentDidMount() {
    let data = [];
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=London&appid=${process.env.REACT_APP_KEY}`;
    await axios.get(url).then(response => {
      data = response.data.list
    });

    let highs = new Map();
    let dateCount = new Map();
    let lows = new Map();
    let iconMap = new Map();

    for (let str in data) {
      let item = data[str];
      let date = item.dt_txt.split(" ")[0];
      let high = item.main.temp_max;
      let low = item.main.temp_min;
      let icon = item.weather[0].icon;

      if (!highs.has(date)) {
        highs.set(date, high); // if not in map, sets initial temp
        dateCount.set(date, 1); //gets number of times date is shown
        lows.set(date, low); // if not in map, sets initial temp
        iconMap.set(date, `${icon} `);
      } else {
        highs.set(date, highs.get(date) + high);
        dateCount.set(date, dateCount.get(date) + 1);
        lows.set(date, lows.get(date) + low);
        iconMap.set(date, iconMap.get(date) + `${icon} `);
      }
    }

    let icons = this.getMaxIcon(iconMap); //icons from getMax
    let nwd = [];

    dateCount.forEach((item, date) => {
      let tempHigh = this.convertToF(highs.get(date) / item);
      let tempLow = this.convertToF(lows.get(date) / item);
      let icon = icons.get(date);

      if (nwd.length < 5) {
        nwd.push({ date, tempLow, tempHigh, icon });
      }
    });
    this.setState({ temps: nwd });
  }

  dateConverter = (date) => {
    const days = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const day = new Date(date);
    const dayOfWeek = day.getDay();
    return days[dayOfWeek];
  };

  render() {
    return (
      <div className="forecast">
        {this.state.temps.map((item) => {
          if (this.state.temps !== undefined) {
            return (
              <div className="day">
                <h4 className="title"> {this.dateConverter(item.date)} </h4>
                <img
                  src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
                  alt="Weather icon"
                />
                <div className="tempRanges">
                  <p id="high"> {item.tempHigh}° </p>
                  <p id="low"> {item.tempLow}° </p>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default FiveDayForeCast;
