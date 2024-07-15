import React, { useState, useEffect } from "react";
import CustomData from "./GetData";
import "./InputHolder.css";

function InputHolder() {
  const [inputValue, setInputValue] = useState("");
  const [cityName, setCityName] = useState("India");
  const [weather, setWeather] = useState(false);
  const { storeData, loading, error, setLoading } = CustomData(
    `https://weatherapi-com.p.rapidapi.com/current.json?q=${cityName}`
  );

  useEffect(() => {
    setWeather(storeData);
  }, [storeData]);

  const handleEvent = () => {
    if (inputValue.trim() !== undefined) {
      setCityName(inputValue);
      setInputValue("");
      setLoading(true);
    } else {
      setLoading(true);
      //   console.error("error");
    }
  };

  if (loading) {
    return (
      <>
        <div className="notData">
          <h2>Loading...</h2>
          <div className="line">
            <div className="line-bar"></div>
          </div>
        </div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <div className="notData">
          <h3>{error}</h3>
          <div className="line">
            <div className="line-bar"></div>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="custom-weather">
      <div className="input-area">
        <input
          type="search"
          value={inputValue}
          placeholder="Search"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleEvent}>
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </div>

      {weather ? (
        weather.location ? (
          <div className="weather-div">
            <div className="city-name">
              <h2>{weather.location ? weather.location.name : ""}</h2>
            </div>
            <div className="city-temp">
              <h2>{weather.current ? weather.location.country : ""}</h2>
            </div>
            <div className="city-temp">
              <h2>{weather.current ? weather.current.temp_c : ""}°C</h2>
            </div>

            <div className="weather-detail">
              <ul>
                <li>
                  <p>humidity</p>
                  <span>{weather.current ? weather.current.humidity : ""}</span>
                </li>
                <li>
                  <p>wind speed</p>
                  <span>{weather.current ? weather.current.wind_kph : ""}</span>
                </li>
                <li>
                  <p>Condition</p>
                  <span>
                    {weather.current ? weather.current.condition.text : ""}
                  </span>
                </li>
                <li>
                  <p>Status</p>
                  <span>
                    {weather.current
                      ? weather.current.is_day
                        ? "Day"
                        : "Night"
                      : ""}
                  </span>
                </li>
                <li>
                  <p>Pressure</p>
                  <span>
                    {weather.current ? weather.current.pressure_in : ""}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="error">
            <h2>Invalid City Name</h2>
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default InputHolder;
