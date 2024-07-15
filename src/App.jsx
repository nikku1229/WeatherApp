import "./App.css";
import InputHolder from "./components/InputHolder";
import LocationHolder from "./components/LocationHolder";

function App() {
  return (
    <div className="container">
      <div className="input-holder">
        <InputHolder />
      </div>

      <div className="location-holder">
        <LocationHolder/>
      </div>
    </div>
  );
}

export default App;
