import { useEffect, useState } from "react";

function CustomData(url) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [storeData, setStoreData] = useState(null);

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
        const response = await fetch(url, options);
        const apiData = await response.json();
        setStoreData(apiData);
        // console.log(apiData);
      } catch {
        setError("API fetch Issue");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url, loading]);

  return { storeData, loading, error, setLoading };
}

export default CustomData;
