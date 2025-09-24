import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&units=metric`
      );

      console.log(response.data);

      setWeather(response.data);
    } catch (err) {
      setError("⚠️ City not found or API request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 text-gray-800 px-4">
      <h1 className="text-4xl font-extrabold text-white mb-8 tracking-wide drop-shadow-lg">
        🌍 Meteora – Live Weather Dashboard
      </h1>

      <SearchBar onSearch={fetchWeather} />

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {weather && <WeatherCard weather={weather} />}

      <footer className="mt-10 text-white/80 text-sm">
        Built with ❤️ by Team DevX
      </footer>
    </div>
  );
}

export default App;
