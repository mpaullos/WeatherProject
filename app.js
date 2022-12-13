const express = require("express");

const bodyParser = require("body-parser");

const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = '19ac5ae8e9670af8d804107c8bb7252d'
  const unity = 'metric'
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query + "&appid=" +apiKey + "&units=" +  unity+ "&lang=pt_br";
  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = 'http://openweathermap.org/img/wn/'+icon +'@2x.png'

      const text1 =`<h1>A temperatura em ${query} é ${temp} ${weatherDescription}</h1>`;
      const text2 ='<img src=' + iconUrl  +'>'
      res.send(text1 + text2)
      
      
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
