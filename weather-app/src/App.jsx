import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError("");
      setWeather(null);
      setForecast(null);

      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      setWeather(weatherRes.data);

      const { lat, lon } = weatherRes.data.coord;
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      console.log("Forecast Data:", forecastRes.data);

      setForecast(forecastRes.data);
    } catch (err) {
      setError("⚠️ City not found or API request failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        setWeather(res.data);

        // also fetch forecast
        const forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        setForecast(forecastRes.data);
      } catch (err) {
        setError("⚠️ Could not fetch weather for your location.");
      } finally {
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 text-gray-800 px-4 py-5">
      <h1 className="text-4xl font-extrabold text-white mb-8 tracking-wide drop-shadow-lg">
        🌍 Meteora – Live Weather Dashboard
      </h1>
      <SearchBar onSearch={fetchWeather} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {weather && <WeatherCard weather={weather} />}
      {forecast && <ForecastCard forecast={forecast} />}{" "}
      <footer className="mt-10 text-white/80 text-sm">
        Built with ❤️ by Team DevX
      </footer>
    </div>
  );
}

export default App;
