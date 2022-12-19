const express = require("express");

const bodyParser = require("body-parser");

const https = require("https");

const app = express();

const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "19ac5ae8e9670af8d804107c8bb7252d";
  const unity = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unity + "&lang=pt_br";

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = Math.ceil(weatherData.main.temp);
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      var day = new Date();
      var hours = day.getHours();
      var minutes = day.getMinutes();
      var month = day.getMonth();
      var dayNames =(day.toLocaleString('pt-br', {weekday:'long'}).split("-")[0]).charAt(0).toUpperCase() + (day.toLocaleString('pt-br', {weekday:'long'}).split("-")[0]).slice(1)
      var dayNumber = day.getDate()
      const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
      function fixHourAndMinutes(hours) {
        if (hours < 10) {
          hours = "0" + hours;
        }
        return hours;
      }

      //const text1 = `<h1>A temperatura em ${query} é ${temp} ${weatherDescription}</h1>`;
      // const text2 = "<img src=" + iconUrl + ">";
      res.render("index", { h1: `${temp}°`, h2: query, span: `${fixHourAndMinutes(hours)}:${fixHourAndMinutes(minutes)}- ${dayNames}, ${dayNumber} ${monthNames[month].slice(0,3)} `, h3:iconUrl });
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
