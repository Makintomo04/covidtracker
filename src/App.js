import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});

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
  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/all`)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
  const handleChange = async (event) => {
    const country = event.target.value;

    const url =
      country === "worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${country}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(country);
        setCountryInfo(data);
      });
  };
  console.log("YO>>>", countryInfo);
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>CORONAVIRUS STATISTICS</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={handleChange} value={country}>
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <Map />
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <h2>Live Cases by Country</h2>
            <h2>Worldwide new Cases</h2>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
