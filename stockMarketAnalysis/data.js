// Data fetching and state management
export let stockProfileData = null;
export let setStock = "AAPL";
export let setTime = "1mo";

export const fetchBookValueAndProfit = async () => {
  try {
    const response = await fetch(
      "https://stock-market-api-k9vl.onrender.com/api/stocksstatsdata"
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getStocksSummary = async () => {
  try {
    const response = await fetch(
      "https://stock-market-api-k9vl.onrender.com/api/profiledata"
    );
    const apiData = await response.json();
    stockProfileData = apiData.stocksProfileData;
    return stockProfileData;
  } catch (error) {
    console.error("Profile fetch failed:", error);
  }
};

export const fetchStockData = async () => {
  try {
    const response = await fetch(
      "https://stock-market-api-k9vl.onrender.com/api/stocksdata"
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
