// STEP 1 - Include Dependencies
// https://www.fusioncharts.com/dev/getting-started/react/your-first-chart-using-react
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
    type: "column2d", 
    width: "400", // The Width of the Chart
    height: "400", // The Height of the Chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the Chart Caption:
        caption: "Countries With Most Oil Reserves [2017-18]",
        //Set the Chart SubCaption:
        subCaption: "In MMbbl = One Million barrels",
        //Set the x-axis Name:
        xAxisName: "Country",
        //Set the y-axis Name:
        yAxisName: "Reserves (MMbbl)",
        numberSuffix: "K",
        //Setting the Theme for your Chart:
        theme: "fusion"
      },
      // This is the Data for the chartData Here:
      data,
    }
  };
  return <ReactFC {...chartConfigs} />
}


export default ChartComponent;
