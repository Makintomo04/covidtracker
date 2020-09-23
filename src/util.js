import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

const casesTypeColors = {
  cases: {
    hex: "#3D86C7",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#39FF14",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1000,
  },
  deaths: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
  tests: {
    hex: "#F8F63F",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 200,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export function CommaFormatted(amount) {
  return amount.toLocaleString("en-US");
}

export const showdataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup className="popup-container">
        <div className="popup-topline">
          <img className="popup-flag" src={country.countryInfo.flag} />
          <div className="popup-country">{country.country}</div>
        </div>
        <div className="popup-cases">
          Cases:{" "}
          <strong>
            {country.cases > 0
              ? numeral(country.cases).format("0,0")
              : "Unknown"}
          </strong>
        </div>
        <div className="popup-deaths">
          Deaths:{" "}
          <strong>
            {country.deaths > 0
              ? numeral(country.deaths).format("0,0")
              : "Unknown"}
          </strong>
        </div>
        <div className="popup-recovered">
          Recovered:{" "}
          <strong>
            {country.recovered > 0
              ? numeral(country.recovered).format("0,0")
              : "Unknown"}
          </strong>
        </div>
      </Popup>
    </Circle>
  ));
