import { setStock, setTime, fetchStockData } from './data.js';

let currentChart, currentData;

export const initChart = () => {
  google.charts.load("current", { packages: ["corechart", "line"] });
  google.charts.setOnLoadCallback(drawChart);
};

export const drawChart = async () => {
  currentData = new google.visualization.DataTable();
  currentData.addColumn("date", "Date");
  currentData.addColumn("number", "stockValue");

  const apiData = await fetchStockData();
  
  if (!apiData?.stocksData?.[0]?.[setStock]?.[setTime]) {
    console.error("No data for", setStock, setTime);
    return;
  }

  const stockMonth = apiData.stocksData[0][setStock][setTime];
  const timeStamp = stockMonth.timeStamp;
  const value = stockMonth.value;

  const rows = [];
  for (let i = 0; i < timeStamp.length; i++) {
    const new_timeStamp = new Date(timeStamp[i] * 1000);
    rows.push([new_timeStamp, value[i]]);
  }

  currentData.addRows(rows);

  const options = {
    colors: ["#a52714"],
    legend: "none",
    hAxis: {
      title: "Date",
      format: "MMM dd, yyyy",
    },
    vAxis: { title: "Stock Value" },
  };

  document.getElementById("chart_div").innerHTML = "";
  currentChart = new google.visualization.LineChart(
    document.getElementById("chart_div")
  );
  currentChart.draw(currentData, options);
};
