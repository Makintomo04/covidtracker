import React, { useState, useEffect, Fragment } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
// import { faShieldVirus } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import Footer from "./Footer";
import Header from "./Header";
import Spinner from "./images/Spinner.gif";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [isInfoClicked, setIsInfoClicked] = useState(false);

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
      country === "Worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${country}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(country);
        setCountryInfo(data);
        if (country === "Worldwide") {
          setMapCenter([34.80746, -40.4796]);
        } else if (data.countryInfo) {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);

          console.log(mapCenter);
        }
        setTimeout(function () {
          country === "worldwide" ? setMapZoom(3) : setMapZoom(5);
        }, 200);
      });
    console.log("TheCountry333: ", country);
  };
  console.log("TheCountry: ", country);

  return (
    <div className="frag">
      <Header className="header" />
      <div className="app">
        {/* <div className="side"></div> */}
        <div className="app__left">
          <div className="app__header">
            <h1>STATISTICS</h1>
            <form className="app__dropdown">
              <select
                className="select"
                onChange={handleChange}
                value={country}
              >
                <option value="Worldwide">Worldwide</option>
                {countries.map((country) => (
                  <option value={country.value}>{country.name} </option>
                ))}
              </select>
            </form>
          </div>

          {countries?.length > 0 && countryInfo ? (
            <div className="app__stats">
              <div
                className="app__stats__box"
                onClick={() => setCasesType("cases")}
              >
                {/* <h3 style={{ color: "#439AE2" }}>Cases</h3> */}
                <InfoBox
                  // active={isInfoClicked}
                  icon={<i class="fas fa-ambulance"></i>}
                  title="Cases"
                  bgCol="#439AE2"
                  cases={countryInfo.todayCases}
                  total={countryInfo.cases}
                />
              </div>

              <div
                className="app__stats__box"
                onClick={() => setCasesType("deaths")}
              >
                {/* <h3 style={{ color: "#F65164" }}>Deaths</h3> */}
                <InfoBox
                  // active={isInfoClicked}
                  icon={<i class="fas fa-skull-crossbones"></i>}
                  title="Deaths"
                  bgCol="#F65164"
                  cases={countryInfo.todayDeaths}
                  total={countryInfo.deaths}
                />
              </div>

              <div
                className="app__stats__box"
                onClick={() => setCasesType("recovered")}
              >
                {/* <h3 style={{ color: "#65DD9B" }}>Recovered</h3> */}
                <InfoBox
                  // active={isInfoClicked}
                  icon={<i class="fas fa-hand-holding-medical"></i>}
                  bgCol="#49cc66"
                  title="Recovered"
                  cases={countryInfo.todayRecovered}
                  total={countryInfo.recovered}
                />
              </div>
              <div
                className="app__stats__box"
                onClick={() => setCasesType("tests")}
              >
                {/* <h3 style={{ color: "#F8F63F" }}>Tests</h3> */}
                <InfoBox
                  bgCol="#f8bd3f"
                  // active={isInfoClicked == true}
                  icon={<i class="fas fa-vial"></i>}
                  title="Tests"
                  // cases={countryInfo.todayTests}
                  total={countryInfo.tests}
                />
              </div>
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img src={Spinner} />
            </div>
          )}

          <Map
            // style={{ cursor: "pointer" }}
            countries={mapCountries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
        <div className="app__right">
          <Card
            style={{ background: "#364060", width: "100%", height: "auto" }}
          >
            <CardContent>
              <h3 style={{ color: "#14c0ff" }}>Live Cases by Country</h3>
              <Table
                setCountryInfo={setCountryInfo}
                setMapZoom={setMapZoom}
                countryProp={setCountry}
                mapCenterProp={setMapCenter}
                countries={tableData}
              />
              <h3 style={{ marginTop: "2rem", color: "#14c0ff" }}>
                Worldwide new Cases
              </h3>
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
