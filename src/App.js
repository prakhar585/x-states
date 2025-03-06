import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [state, setState] = useState("");
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          ` https://crio-location-selector.onrender.com/countries`
        );
        const normalizedCountries = response.data.map((item) => item.trim());
        setCountryList(normalizedCountries);

      } catch (error) {
        console.error("Error fetcing data:", error);
      }
    };
    fetchCountry();
  }, []);

  useEffect(() => {
  
    if(!country) return;

      const fetchStates = async () => {
        try {
          const response = await axios.get(
            `https://crio-location-selector.onrender.com/country=${country}/states`
          );
          setStateList(response.data);
        } catch (error) {
          console.error("Error fetcing data:", error);
        }
      };
      fetchStates();
    
  }, [country]);

  //fetch city
  useEffect(() => {
    setCity("");

    if (!country || !state) {
      setCityList([]);
      return;
    }
      const fetchCity = async () => {
        try {
          const response = await axios.get(
            `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
          );
          setCityList(response.data);
        } catch (error) {
          console.error("Error fetcing data:", error);
        }
      };
      fetchCity();
    
  }, [state, country]);

  return (
    <div className="App">
      <h2 style={{ textAlign: "center" }}>Select Location</h2>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <select
          style={{
            width: "400px",
            height: "30px",
            textAlign: "center",
            margin: "5px",
          }}
          value={country}
          onChange={(e) => {
            const selectedCountry = e.target.value;
            setCountry(selectedCountry);
            setState("");
            setCity("");
            setStateList([]);
            setCityList([]);
          }}
        >
          <option value="" disabled>
            Select Country
          </option>
          {countryList.map((item, index) => (
            <option key={`${item}-${index}`}>{item}</option>
          ))}
        </select>



        {/* City */}
        <select
          style={{
            width: "250px",
            height: "30px",
            textAlign: "center",
            margin: "5px",
          }}
          value={state}
          onChange={(e) => {
            const selectedState = e.target.value;
            setState(selectedState);
          }}
        >
          <option value="" disabled>
            Select state
          </option>
          {stateList.map((item,index) => (
            <option key={`${item}-${index}`}>{item}</option>
          ))}
        </select>


        <select
          style={{
            width: "250px",
            height: "30px",
            textAlign: "center",
            margin: "5px",
          }}
          value={city}
          onChange={(e) => {
            const selectedCity = e.target.value;
            setCity(selectedCity);
          }}
        >
          <option value="" disabled>
            Select city
          </option>
          {cityList.map((item, index) => (
            <option key={`${item}-${index}`}>{item}</option>
          ))}
        </select>
      </div>
      {country && state && city ? (
        <div style={{textAlign:'center', marginTop:'30px'}}> 
          You selected {city}, {state}, {country}
        </div>
      ) : null}
    </div>
  );
}

export default App;
