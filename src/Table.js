import React, { useEffect, useState } from "react";
import "./Table.css";
import { CommaFormatted } from "./util";
function Table({
  setCountryInfo,
  setMapZoom,
  countryProp,
  mapCenterProp,
  countries,
}) {
  const [country, setCountry] = useState([]);

  return (
    <div className="table">
      {countries.map(({ country, cases, countryInfo }) => (
        <tr
          onClick={() => {
            return (
              fetch(
                `https://disease.sh/v3/covid-19/countries/${countryInfo.iso2}`
              )
                .then((response) => response.json())
                .then((data) => {
                  setCountryInfo(data);
                }),
              setCountry(country),
              setMapZoom(5),
              mapCenterProp([countryInfo.lat, countryInfo.long]),
              countryProp(countryInfo.iso2)
            );
          }}
        >
          <div className="table__country">
            <td>
              <img
                height="40px"
                width="40px"
                style={{ borderRadius: "100%" }}
                src={countryInfo.flag}
              />
            </td>

            <td>{country}</td>
          </div>
          <td>
            <strong>{CommaFormatted(cases)}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
