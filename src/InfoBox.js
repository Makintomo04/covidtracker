import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total }) {
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography color="text-secondary" className="infoBox__total">
          {title}
        </Typography>
        <h2 className="infoBox__cases">
          {cases > 0 ? cases.toLocaleString() : "Unknown"}
        </h2>
        <Typography className="infoBox__total">
          {total > 0 ? total.toLocaleString() : "Unknown"} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
