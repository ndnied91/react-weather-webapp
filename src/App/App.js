import './App.css';
import Weather from '../Weather'
import FiveDayForecast from '../FiveDayForecast'

function App() {
  return (
    <div className="App">
      <h1> Weather Project </h1>
      <Weather/>
      <div className="fiveDayForecast">
        <FiveDayForecast/>
      </div>
    </div>
  );
}

export default App;
