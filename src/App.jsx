import { useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "fa033db3b997e433bd57bd57873b46d6"; 

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name!");
      setWeather(null);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 404) {
        setError("City not found! Try again.");
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch (err) {
      setError("Failed to fetch data. Please check your connection.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        component="section"
        sx={{
          p: 10,
          border: "1px dashed grey",
          backgroundImage:
            'url("https://images.pexels.com/photos/186980/pexels-photo-186980.jpeg?cs=srgb&dl=pexels-tahir-shaw-50609-186980.jpg&fm=jpg")',
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          className="weatherbox"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            width: { xs: "90%", sm: 500 },
            height: { xs: 350, sm: "auto" },
            boxShadow: 15,
            flexDirection: "column",
            p: 3,
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <h1 style={{ color: "yellow", textAlign: "center" }}>
            Weather Detector
          </h1>

          <TextField
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ backgroundColor: "white", borderRadius: 5 }}
            id="outlined-basic"
            label="Enter city"
            variant="outlined"
          />

          <Button
            onClick={fetchWeather}
            style={{ backgroundColor: "red", marginTop: 10, width: "50%" }}
            variant="contained"
          >
            Search
          </Button>

          {loading && <p style={{ color: "white" }}>Loading...</p>}
          {error && <p style={{ color: "orange" }}>{error}</p>}

          {weather && (
            <Box sx={{ mt: 2, color: "white", textAlign: "center" }}>
              <h2>{weather.name}</h2>
              <p>{weather.weather[0].description.toUpperCase()}</p>
              <p>🌡️ Temp: {weather.main.temp} °C</p>
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>🌬️ Wind: {weather.wind.speed} m/s</p>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default App;
