import { 
  fetchBookValueAndProfit, 
  getStocksSummary, 
  setStock 
} from './data.js';
import { initChart } from './chart.js';
import { initStockEvents, initTimeEvents, populateStockTable, updateStockDetail } from './ui.js';

// Initialize app
const initApp = async () => {
  // Load chart library
  initChart();
  
  // Load profile data first
  await getStocksSummary();
  updateStockDetail(setStock);
  
  // Load table data
  const tableData = await fetchBookValueAndProfit();
  if (tableData) {
    populateStockTable(tableData);
  }
  
  // Setup event listeners
  initStockEvents();
  initTimeEvents();
};

// Start the app
initApp();



// const listBody = document.querySelector(".list-body");
// const stockDetail = document.querySelector(".stockDetail");
// let currentChart, currentData;
// let setTime = "1mo";
// let setStock = "AAPL";
// let stockProfileData = null; // Store profile data globally

// google.charts.load("current", { packages: ["corechart", "line"] });
// google.charts.setOnLoadCallback(chartFunction);

// // Event delegation for stock clicks
// listBody.addEventListener("click", (e) => {
//   if (e.target.classList.contains("stockButton")) {
//     setStock = e.target.textContent.trim();
//     console.log("Selected stock:", setStock);
//     chartFunction();
//     setDetail(setStock); // Now accessible
//   }
// });

// // Time button handlers
// document.querySelectorAll(".timeButton").forEach((btn) => {
//   btn.addEventListener("click", () => {
//     setTime = btn.value;
//     chartFunction();
//   });
// });

// // ✅ MOVED setDetail function to TOP LEVEL SCOPE
// function setDetail(stockSymbol) {
//   if (!stockProfileData?.[0]?.[stockSymbol]) {
//     console.error("No profile data for:", stockSymbol);
//     stockDetail.textContent = "Profile data not available";
//     return;
//   }
//   const stockName = stockProfileData[0][stockSymbol];
//   stockDetail.textContent = stockName.summary || "No summary available";
// }

// // Fetch stock table data
// const fetchBookValueAndProfit = async () => {
//   try {
//     const response = await fetch(
//       "https://stock-market-api-k9vl.onrender.com/api/stocksstatsdata"
//     );
//     return await response.json();
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Fetch stock profile data (runs once)
// const getStocksSummary = async () => {
//   try {
//     const response = await fetch(
//       "https://stock-market-api-k9vl.onrender.com/api/profiledata"
//     );
//     const apiData = await response.json();
//     stockProfileData = apiData.stocksProfileData; // Store globally
//     setDetail(setStock); // Set initial stock detail
//   } catch (error) {
//     console.error("Profile fetch failed:", error);
//   }
// };

// // Load table data
// fetchBookValueAndProfit()
//   .then((apiData) => {
//     const stockObject = apiData.stocksStatsData[0];

//     for (let key in stockObject) {
//       if (key === "_id") {
//         continue; // Skip _id
//       }

//       const tableRow = document.createElement("tr");
//       const stockValue = stockObject[key].bookValue;
//       // const stockProfit = stockObject[key].profit;
//       const stockProfit = Math.round(stockObject[key].profit * 100) / 100;

//       let gainprofit;
//       if (stockProfit > 0) {
//         gainprofit = "greenColor";
//       } else {
//         gainprofit = "redColor";
//       }

//       tableRow.innerHTML = `<td class="stockButton">${key}</td>
//                           <td>${stockValue}</td>
//                           <td class='${gainprofit}'>${stockProfit}%</td>`;

//       listBody.appendChild(tableRow);
//     }
//   })
//   .catch((error) =>
//     console.error("Fetch failed: For BookValue and Profit", error)
//   );

// // Load profile data FIRST
// getStocksSummary();

// function chartFunction() {
//   currentData = new google.visualization.DataTable();
//   currentData.addColumn("date", "Date"); // ✅ CHANGED: 'date' instead of 'number'
//   currentData.addColumn("number", "stockValue");

//   const fetchstockData = async () => {
//     try {
//       const response = await fetch(
//         "https://stock-market-api-k9vl.onrender.com/api/stocksdata"
//       );
//       return await response.json();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   fetchstockData().then((apiData) => {
//     if (!apiData?.stocksData?.[0]?.[setStock]?.[setTime]) {
//       console.error("No data for", setStock, setTime);
//       return;
//     }

//     const stockMonth = apiData.stocksData[0][setStock][setTime];
//     const timeStamp = stockMonth.timeStamp;
//     const value = stockMonth.value;

//     const rows = [];
//     for (let i = 0; i < timeStamp.length; i++) {
//       const new_timeStamp = new Date(timeStamp[i] * 1000); // Date object
//       rows.push([new_timeStamp, value[i]]);
//     }

//     currentData.addRows(rows);

//     const options = {
//       colors: ["#a52714"],
//       legend: "none",
//       hAxis: {
//         title: "Date",
//         format: "MMM dd, yyyy", // Shows "Jun 21, 2023"
//       },
//       vAxis: { title: "Stock Value" },
//     };

//     document.getElementById("chart_div").innerHTML = "";
//     currentChart = new google.visualization.LineChart(
//       document.getElementById("chart_div")
//     );
//     currentChart.draw(currentData, options);
//   });
// }