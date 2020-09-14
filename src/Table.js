import React from "react";
import "./Table.css";
import { CommaFormatted } from "./util";
function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ country, cases, countryInfo }) => (
        <tr>
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
