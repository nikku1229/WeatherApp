import React, { useEffect, useState } from "react";
import GetGeoData from "./GetGeoData";
import './LocationHolder.css'

function LocationHolder() {
  const [lat, setLat] = useState("28.6");
  const [lon, setLon] = useState("77.2");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude.toFixed(3);
          const longitude = position.coords.longitude.toFixed(3);
          setLat(latitude);
          setLon(longitude);
          setLoading(false);
          console.log(latitude);
          console.log(longitude);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setLoading(false);
            // setData(false);
            setError("Location Access Denied");
          }
        }
      );
    } else {
      setError("Geolocation not support in this device");
    }
  }, [lat, lon]);

  const { geoData } = GetGeoData(
    `https://weatherapi-com.p.rapidapi.com/current.json?q=${lat},${lon}`,
    setError,
    setLoading
  );

  useEffect(() => {
    setData(geoData);
  }, [geoData]);

  if (loading) {
    return (
      <>
        <div className="notData">
          <h1>Loading...</h1>
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
    <>
      {data && (
        <div className="location-data">
          <div className="location-city-name">
            <h1>{data.location?.name}</h1>
            <p>
              {data.location?.region},{data.location?.country}
            </p>
          </div>
          <div className="location-city-temp">
            <h2>{data.current?.temp_c}°C</h2>
          </div>

          <div className="location-detail">
            <ul>
              <li>
                <p>Humidity</p>
                <span>{data.current?.humidity}</span>
              </li>
              <li>
                <p>Condition</p>
                <span>{data.current?.condition?.text}</span>
              </li>
              <li>
                <p>Status</p>
                <span>{data.current?.is_day ? "Day" : "Night"}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default LocationHolder;
