import { useState } from "react";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiHumidity,
  WiStrongWind,
  WiThermometer,
} from "react-icons/wi";
import PropTypes from "prop-types";

WeatherCard.propTypes = {
  weather: PropTypes.object,
};

export default function WeatherCard({ weather }) {
  const [unit, setUnit] = useState("C"); // "C" for Celsius, "F" for Fahrenheit

  if (!weather) return null;

  const { name, main, weather: details, wind } = weather;
  const description = details[0]?.description;
  const tempC = Math.round(main.temp);
  const feelsC = Math.round(main.feels_like);

  const toFahrenheit = (c) => Math.round((c * 9) / 5 + 32);

  const temp = unit === "C" ? tempC : toFahrenheit(tempC);
  const feelsLike = unit === "C" ? feelsC : toFahrenheit(feelsC);
  const humidity = main.humidity;
  const windSpeed = wind.speed;

  // Dynamic icon selection
  const iconMap = {
    Clear: <WiDaySunny className="text-yellow-400 drop-shadow-lg" size={72} />,
    Clouds: <WiCloud className="text-gray-300 drop-shadow-lg" size={72} />,
    Rain: <WiRain className="text-blue-400 drop-shadow-lg" size={72} />,
    Snow: <WiSnow className="text-blue-200 drop-shadow-lg" size={72} />,
    Thunderstorm: (
      <WiThunderstorm className="text-purple-500 drop-shadow-lg" size={72} />
    ),
  };

  const icon = iconMap[details[0]?.main] || <WiDaySunny size={72} />;

  return (
    <div className="mt-8 p-6 bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl w-full max-w-md text-center border border-white/30">
      {/* City Name */}
      <h2 className="text-3xl font-bold text-white mb-4">{name}</h2>

      {/* Weather Icon & Temp */}
      <div className="flex flex-col items-center">
        {icon}
        <p className="text-5xl font-extrabold text-white mt-2">
          {temp}°{unit}
        </p>
        <p className="capitalize text-gray-200 mt-1 text-lg">{description}</p>
      </div>

      {/* Toggle Unit */}
      <div className="mt-4">
        <button
          onClick={() => setUnit(unit === "C" ? "F" : "C")}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-md hover:scale-105 transition-transform"
        >
          Show in °{unit === "C" ? "F" : "C"}
        </button>
      </div>

      {/* Extra Info */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-white/90 text-sm">
        <div className="flex flex-col items-center bg-white/10 p-3 rounded-xl">
          <WiThermometer size={28} />
          <p className="font-semibold">
            {feelsLike}°{unit}
          </p>
          <p className="text-xs">Feels Like</p>
        </div>
        <div className="flex flex-col items-center bg-white/10 p-3 rounded-xl">
          <WiHumidity size={28} />
          <p className="font-semibold">{humidity}%</p>
          <p className="text-xs">Humidity</p>
        </div>
        <div className="flex flex-col items-center bg-white/10 p-3 rounded-xl">
          <WiStrongWind size={28} />
          <p className="font-semibold">{windSpeed} m/s</p>
          <p className="text-xs">Wind</p>
        </div>
      </div>
    </div>
  );
}
