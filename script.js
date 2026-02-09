const body = document.getElementById("forecastBody");
const timer = document.getElementById("timer");

/* 🔗 BACKEND API URL (CHANGE THIS) */
const API_URL = "https://YOUR_VERCEL_URL/forecast";

/* ⏱ Countdown timer (5 minutes) */
let seconds = 300;

setInterval(() => {
  seconds--;
  if (seconds < 0) seconds = 300;

  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  timer.textContent = `Next update in: ${m}:${s}`;
}, 1000);

/* 📡 Load live forecast data */
async function loadForecast() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    body.innerHTML = "";

    data.forEach(row => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td data-label="Pair">${row.pair}</td>
        <td data-label="Candle 1">${row.c1.dir} ${row.c1.prob}</td>
        <td data-label="Candle 2">${row.c2.dir} ${row.c2.prob}</td>
        <td data-label="Candle 3">${row.c3.dir} ${row.c3.prob}</td>
        <td data-label="Best">${row.best}</td>
      `;

      body.appendChild(tr);
    });

  } catch (err) {
    console.error("Error loading forecast:", err);
    body.innerHTML = `
      <tr>
        <td colspan="5">Waiting for live data...</td>
      </tr>
    `;
  }
}

/* 🚀 Initial load + auto refresh */
loadForecast();
setInterval(loadForecast, 15000);
