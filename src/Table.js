import React from "react";
import "./Table.css";
import { CommaFormatted } from "./util";
function Table({ mapCenterProp, countries }) {
  return (
    <div className="table">
      {countries.map(({ country, cases, countryInfo }) => (
        <tr onClick={() => mapCenterProp([countryInfo.lat, countryInfo.long])}>
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
