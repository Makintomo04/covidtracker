import React from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <h1>CORONAVIRUS STATISTICS</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="Value">
            <MenuItem value="worldwide">Country 1 </MenuItem>
            <MenuItem value="worldwide">Country 2 </MenuItem>
            <MenuItem value="worldwide">Country 3 </MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
