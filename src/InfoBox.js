import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";
function InfoBox({ active, icon, iconColor, title, cases, total }) {
  return (
    <Card className={`infoBox ${active && "box--selected"}`}>
      <CardContent>
        <div className="infoBox--top">
          <div className={`icons  ${iconColor}`}>{icon}</div>
          {/* <Typography color="text-secondary" className="infoBox__total">
          {title}
        </Typography> */}
          {/* <h2 className={`infoBox__cases ${iconColor}`}>
            {cases > 0 ? cases.toLocaleString() : "Unknown"}
          </h2> */}
          <Typography className={`infoBox__total ${iconColor}`}>
            <h2>{total > 0 ? total.toLocaleString() : "Unknown"}</h2>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
