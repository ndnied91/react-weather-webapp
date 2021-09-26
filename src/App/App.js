
import './App.css';

import Weather from '../Weather/Weather'

import FiveDayForeCast from '../5DayForecast/FiveDayForecast'

function App() {
  return (
    <div className="App">


      <h1> Weather Project </h1>


      <Weather/>


      <div className="forecast1">
        <FiveDayForeCast/>
      </div>
    </div>
  );
}

export default App;
