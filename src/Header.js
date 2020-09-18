import React, { useState, useEffect } from "react";
import "./Header.css";
import * as moment from "moment";
function Header() {
  const [time, setTime] = useState([]);
  useEffect(() => {
    setInterval(updateTime, 1000);
  });

  const updateTime = () => {
    setTime(moment().format("h:mm:ss a"));
  };
  console.log("FAMMM");
  return (
    <header>
      <h2 style={{ flex: "1" }}>{moment().format("dddd, MMMM Do YYYY")}</h2>
      <h2 style={{ background: "red" }}>COVID-19 TRACKER🦠😷</h2>
      <h2 style={{ flex: "1", textAlign: "right" }}>{time}</h2>
    </header>
  );
}

export default Header;
