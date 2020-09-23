import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";
function InfoBox({ active, icon, iconColor, title, cases, total, bgCol }) {
  return (
    <div className="infoCard">
      <Card
        style={{ backgroundColor: bgCol }}
        className={`infoBox ${active && "box--selected"}`}
      >
        <CardContent>
          <div className="infoBox--top">
            <div className={`icons  ${iconColor}`}>{icon}</div>
            {/* <Typography color="text-secondary" className="infoBox__total">
            {title}
          </Typography> */}
          </div>
        </CardContent>
      </Card>
      <div className="data">
        {/* <h2 style={{ color: "white" }}>Today</h2>
        <h2 className={`infoBox__cases ${iconColor}`}>
          {cases > 0 ? cases.toLocaleString() : "Unknown"}
        </h2>
        <br /> */}

        <h2
          style={{ color: "#8c8c8c", fontWeight: "normal", fontSize: "14px" }}
        >
          {title}
        </h2>
        <h2 style={{ color: "white" }} className="infoBox__total__H">
          {total > 0 ? total.toLocaleString() : "Unknown"}
        </h2>
      </div>
    </div>
  );
}

export default InfoBox;
