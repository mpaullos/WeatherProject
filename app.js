const { json } = require("express");
const express = require("express");

const https = require("https");

const app = express();

app.get("/", (req, res) => {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Simão Dias&appid=19ac5ae8e9670af8d804107c8bb7252d&units=metric&lang=pt_br";
  https.get(url, (res) => {
    console.log(res.statusCode);

    res.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      console.log(temp, weatherDescription);
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
