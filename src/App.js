import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");

  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountries();
  }, []);
  const handleChange = (event) => {
    const country = event.target.value;
    setCountry(country);
  };

  return (
    <div className="app">
      <div className="app__header">
        <h1>CORONAVIRUS STATISTICS</h1>
        <FormControl className="app__dropdown" style={{ width: "200px" }}>
          <Select
            variant="outlined"
            defaultValue="Select Country"
            value={country}
            onChange={handleChange}
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name} </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
