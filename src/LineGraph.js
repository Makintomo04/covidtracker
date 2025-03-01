import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import "./Linegraph.css";
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType = "cases") => {
  const chartData = [];
  let lastDataPoint;

  for (let date in data[casesType]) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType = "cases" }) {
  const [data, setData] = useState({});
  //

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=120`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          let chartData = buildChartData(data, "cases");
          setData(chartData);
        });
    };
    fetchData();
  }, [casesType]);
  return (
    <div className="graph">
      {data?.length > 0 && (
        <Line
          type="bar"
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: "#14c0ff7a",
                borderColor: "#14c0ff",
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default LineGraph;
