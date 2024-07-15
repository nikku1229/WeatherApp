import { useEffect, useState } from "react";

function GetGeoData(url,setError,setLoading) {
  const [geoData, setGeoData] = useState(null);

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "5c2880f663msh3e36db5d9fc3831p13c996jsned995602cfdb",
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    },
  };

  useEffect(() => {
      async function fetchData() {
        try {
          setLoading(true)
          const response = await fetch(url, options);
          const apiData = await response.json();
          setGeoData(apiData);
          console.log(apiData);
        } catch {
          setError('API Fetch Issue')
            // setError(true);
        }
      }

      fetchData();
  }, [url]);

  return { geoData };
}

export default GetGeoData;
