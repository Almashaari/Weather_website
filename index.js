import axios from "axios";
import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render("index.ejs", { weather: null, error: null });
});

app.get("/weather", async (req, res) => {
  const yourAPIKey = "28b04fec28953d866b8332391a580c68";
  const city = req.query.city;
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${yourAPIKey}`;
  let weather;
  let error = null;
  try {
    const result = await axios.get(APIUrl);
    weather = result.data;
  } catch (error) {
    console.log(error.response);
    res.status(500);
  }
  res.render("index.ejs", { weather, error });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
