// STEP 1 - Include Dependencies
// Include react:
import React from "react";

// Include the react-fusioncharts component:
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library:
import FusionCharts from "fusioncharts";

// Include the chart type:
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion:
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

// STEP 2 - Chart Data


// STEP 3 - Creating the JSON object to store the chart configurations


const ChartComponent = ({data})=>{
  const chartConfigs = {
    // Change the Alias Name:
    // Which Chart do I want to Use:
    type: "column3d", 
    width: "100%", // The Width of the Chart
    height: "400", // The Height of the Chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
      // This will set the SubTitle of the Page:
      caption: "Most Popular",
      yAxisName: "Stars",
      xAxisName: "Repos",
      xAxisNameFontSize: "16px",
      yAxisNameFontSize: "16px"

      },
      // This is the Data for the data Here:
      data:data
    }
  };
  return <ReactFC {...chartConfigs} />
}


export default ChartComponent;




