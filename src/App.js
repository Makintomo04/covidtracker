import React, { useState, useEffect, Fragment } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import { faShieldVirus } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import Footer from "./Footer";
import Header from "./Header";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [flagClicked, setFlagClicked] = useState(false);

  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
          console.log(data);
        });
    };
    getCountries();
  }, []);

  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/all`)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        console.log("data", data);
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
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
      });
    console.log("TheCountry333: ", country);
  };
  console.log("TheCountry: ", country);

  return (
    <div className="frag">
      <Header className="header" />
      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <h1>STATISTICS</h1>
            <FormControl className="app__dropdown">
              <Select
                className="select"
                variant="filled"
                onChange={handleChange}
                value={country}
              >
                <MenuItem value="Worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name} </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {countries?.length > 0 && (
            <div className="app__stats">
              <div className="app__stats__box">
                <h3>Cases</h3>
                <InfoBox
                  icon={<i class="fas fa-ambulance"></i>}
                  iconColor="black"
                  title="Coronavirus Cases"
                  cases={countryInfo.todayCases}
                  total={countryInfo.cases}
                />
              </div>
              <div className="app__stats__box">
                <h3>Deaths</h3>
                <InfoBox
                  icon={<i class="fas fa-skull-crossbones"></i>}
                  iconColor="red"
                  title="Deaths"
                  cases={countryInfo.todayDeaths}
                  total={countryInfo.deaths}
                />
              </div>
              <div className="app__stats__box">
                <h3>Recovered</h3>
                <InfoBox
                  icon={<i class="fas fa-hand-holding-medical"></i>}
                  iconColor="green"
                  title="Recovered"
                  cases={countryInfo.todayRecovered}
                  total={countryInfo.recovered}
                />
              </div>
            </div>
          )}
          <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
        </div>
        <div className="app__right">
          <Card>
            <CardContent>
              <h3 style={{ color: "red" }}>Live Cases by Country</h3>
              <Table
                setCountryInfo={setCountryInfo}
                setMapZoom={setMapZoom}
                countryProp={setCountry}
                mapCenterProp={setMapCenter}
                countries={tableData}
              />
              <h3 style={{ marginTop: "2rem" }}>Worldwide new Cases</h3>
              <LineGraph />
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
