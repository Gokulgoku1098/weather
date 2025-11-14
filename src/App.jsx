import { useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

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
        setError("City not found!");
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch (err) {
      setError("Network error.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage:
            'url("https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: 450 },
            p: 4,
            borderRadius: 5,
            backdropFilter: "blur(15px)",
            background: "rgba(255,255,255,0.09)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow:
              "0px 15px 35px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 200, 255, 0.4)",
            textAlign: "center",
            animation: "fadeIn 0.8s",
          }}
        >
          <h1
            style={{
              color: "#00eaff",
              fontWeight: "bold",
              fontSize: "2rem",
              letterSpacing: 1,
              marginBottom: "15px",
              textShadow: "0 0 10px rgba(0,255,255,0.6)",
            }}
          >
            Weather Detector
          </h1>

          <TextField
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            label="Enter city"
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: "gray" }} />,
            }}
            sx={{
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          <Button
            onClick={fetchWeather}
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              py: 1.2,
              background:
                "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
              borderRadius: 3,
              fontWeight: "bold",
              letterSpacing: 1,
              boxShadow: "0 0 15px rgba(0,150,255,0.7)",
            }}
          >
            Search
          </Button>

          {loading && (
            <p style={{ color: "white", marginTop: 15 }}>Loading...</p>
          )}
          {error && (
            <p style={{ color: "#ff6b6b", marginTop: 15 }}>{error}</p>
          )}

          {weather && (
            <Box
              sx={{
                mt: 3,
                p: 3,
                borderRadius: 4,
                background: "rgba(0,0,0,0.35)",
                color: "white",
                fontSize: "1.1rem",
                boxShadow: "0 0 20px rgba(0,255,255,0.3)",
                animation: "fadeIn 0.7s",
              }}
            >
              <h2 style={{ color: "#00eaff" }}>{weather.name}</h2>

              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt=""
                style={{ width: 100 }}
              />

              <p style={{ fontSize: "1.2rem" }}>
                {weather.weather[0].description.toUpperCase()}
              </p>

              <p>🌡️ Temp: <strong>{weather.main.temp} °C</strong></p>
              <p>💧 Humidity: <strong>{weather.main.humidity}%</strong></p>
              <p>🌬️ Wind: <strong>{weather.wind.speed} m/s</strong></p>
            </Box>
          )}
        </Box>
      </Box>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export default App;
