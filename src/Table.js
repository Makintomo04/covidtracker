import React from "react";

function Table({ countries }) {
  console.log("FAMM>>>", countries);
  return (
    <div className="table">
      {countries.map(({ country, cases, countryInfo }) => (
        <tr>
          <td>
            <img
              height="40px"
              width="40px"
              style={{ borderRadius: "100%" }}
              src={countryInfo.flag}
            />
          </td>
          <td>{country}</td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
