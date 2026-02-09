const body = document.getElementById("forecastBody");
const timer = document.getElementById("timer");

let seconds = 300;

setInterval(() => {
  seconds--;
  if (seconds < 0) seconds = 300;
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  timer.textContent = `Next update in: ${m}:${s}`;
}, 1000);

const demo = [
  { pair: "EUR/USD", c1: "UP 0.72", c2: "UP 0.68", c3: "DOWN 0.61" },
  { pair: "GBP/USD", c1: "UP 0.81", c2: "UP 0.77", c3: "UP 0.71" },
  { pair: "USD/JPY", c1: "DOWN 0.64", c2: "DOWN 0.60", c3: "UP 0.55" }
];

function render() {
  body.innerHTML = "";
  demo.forEach((r, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td data-label="Pair">${r.pair}</td>
      <td data-label="Candle 1" class="${i === 1 ? 'highlight' : ''}">${r.c1}</td>
      <td data-label="Candle 2">${r.c2}</td>
      <td data-label="Candle 3">${r.c3}</td>
      <td data-label="Best">C1</td>
    `;
    body.appendChild(tr);
  });
}

render();
