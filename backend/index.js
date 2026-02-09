import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.TWELVE_API;

const PAIRS = [
  "EUR/USD","GBP/USD","USD/JPY",
  "USD/CHF","USD/CAD","AUD/USD","NZD/USD"
];

function forecast(prices) {
  let probUp = 0.5;

  if (prices.at(-1) > prices.at(-2)) probUp += 0.1;
  if (prices.at(-1) > prices.at(-5)) probUp += 0.1;

  probUp = Math.min(Math.max(probUp, 0), 1);

  return {
    dir: probUp >= 0.5 ? "UP" : "DOWN",
    prob: probUp.toFixed(2)
  };
}

app.get("/forecast", async (req, res) => {
  let output = [];

  for (let pair of PAIRS) {
    const url = `https://api.twelvedata.com/time_series?symbol=${pair.replace("/","")}&interval=1min&outputsize=50&apikey=${API_KEY}`;
    const r = await fetch(url);
    const d = await r.json();
    if (!d.values) continue;

    const prices = d.values.map(v => +v.close).reverse();

    output.push({
      pair,
      c1: forecast(prices),
      c2: forecast(prices.slice(-45)),
      c3: forecast(prices.slice(-40)),
      best: "C1"
    });
  }

  res.json(output);
});

app.listen(PORT, () => console.log("Robot running"));
