import { setStock, setTime, stockProfileData } from './data.js';
import { drawChart } from './chart.js';

const listBody = document.querySelector(".list-body");
const stockDetail = document.querySelector(".stockDetail");

// Stock click handler
export const initStockEvents = () => {
  listBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("stockButton")) {
      setStock = e.target.textContent.trim();
      console.log("Selected stock:", setStock);
      drawChart();
      updateStockDetail(setStock);
    }
  });
};

// Time button handlers
export const initTimeEvents = () => {
  document.querySelectorAll(".timeButton").forEach((btn) => {
    btn.addEventListener("click", () => {
      setTime = btn.value;
      drawChart();
    });
  });
};

export const updateStockDetail = (stockSymbol) => {
  if (!stockProfileData?.[0]?.[stockSymbol]) {
    console.error("No profile data for:", stockSymbol);
    stockDetail.textContent = "Profile data not available";
    return;
  }
  const stockName = stockProfileData[0][stockSymbol];
  stockDetail.textContent = stockName.summary || "No summary available";
};

// Populate stock table
export const populateStockTable = async (apiData) => {
  const stockObject = apiData.stocksStatsData[0];
  
  for (let key in stockObject) {
    if (key === "_id") continue;

    const tableRow = document.createElement("tr");
    const stockValue = stockObject[key].bookValue;
    const stockProfit = Math.round(stockObject[key].profit * 100) / 100;
    const gainprofit = stockProfit > 0 ? "greenColor" : "redColor";

    tableRow.innerHTML = `<td class="stockButton">${key}</td>
                        <td>${stockValue}</td>
                        <td class='${gainprofit}'>${stockProfit}%</td>`;

    listBody.appendChild(tableRow);
  }
};
