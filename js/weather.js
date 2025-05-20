const apiKey = "901ceaef580e9e193bc68bfbdde66a7b";
const city = "Moscow";

async function fetchWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();

  document.getElementById(
    "temperature"
  ).innerText = `Температура: ${data.main.temp}°C`;
  document.getElementById(
    "condition"
  ).innerText = `Состояние: ${data.weather[0].description}`;
  document.getElementById("wind").innerText = `Ветер: ${data.wind.speed} м/с`;
}

function logout() {
  localStorage.removeItem("authToken");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("authToken")) {
    window.location.href = "index.html";
  } else {
    fetchWeather();
  }
});
