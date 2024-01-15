// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

// STEP 2 - Chart Data


// STEP 3 - Creating the JSON object to store the chart configurations


const ChartComponent = ({data})=>{
  const chartConfigs = {
    // Change the Alias Name:
    // Which Chart do I want to Use:
    type: "pie3d", 
    width: "400", // The Width of the Chart
    height: "400", // The Height of the Chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
      // This will set the SubTitle of the Page:
      caption: "Languages",
      // Setting the theme to be "fusion":
      theme: "fusion",
      // Setting the decimals to be 0:
      decimals: 0,
      // Change the Pie Radius:
      pieRadius: "35%",
      // Provide More Options for the colors,
      // Otherwise the colors will Repeat itself:
      paletteColors: ['#00FFFF','#FF0000','#FFA500']

      },
      // This is the Data for the chartData Here:
      data:data
    }
  };
  return <ReactFC {...chartConfigs} />
}


export default ChartComponent;
