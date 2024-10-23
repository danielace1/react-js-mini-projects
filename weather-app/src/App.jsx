// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

import { useState } from "react";

const App = () => {
  const [cityName, setCityName] = useState("");
  const [deg, setDeg] = useState("0");

  const [district, setDistrict] = useState("City Name");

  const city = (e) => {
    const inputCity = e.target.value;
    setCityName(inputCity);
  };

  const weatherAPI = import.meta.env.VITE_WEATHER_API_KEY;

  const searchCity = async () => {
    try {
      if (cityName.length != 0) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${weatherAPI}`;

        const response = await fetch(url);

        const data = await response.json();
        setDistrict(data.name);
        setDeg(data.main.temp);
        console.log(data);
      }
    } catch (error) {
      console.log("No city data found");
    }
  };

  const handleSearch = () => {
    searchCity();
    if (cityName.length === 0) {
      alert("Please enter city name");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-violet-300 min-h-screen">
      <div className="p-5 bg-violet-200">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-500 text-3xl text-center font-black">
          Weather App
        </h1>
      </div>

      <div className="flex-shrink-0 m-14 relative overflow-hidden bg-purple-500 rounded-lg max-w-md mx-auto shadow-lg">
        <svg
          className="absolute bottom-0 left-0 mb-8"
          viewBox="0 0 375 283"
          fill="none"
          style={{ transform: "scale(1.5)", opacity: "0.1" }}
        >
          <rect
            x="159.52"
            y={175}
            width={152}
            height={152}
            rx={8}
            transform="rotate(-45 159.52 175)"
            fill="white"
          />
          <rect
            y="107.48"
            width={152}
            height={152}
            rx={8}
            transform="rotate(-45 0 107.48)"
            fill="white"
          />
        </svg>
        <div className="relative pt-10 px-8 flex items-center justify-center">
          <div
            className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
            style={{
              background: "radial-gradient(black, transparent 60%)",
              transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
              opacity: "0.2",
            }}
          ></div>
          <div className="relative w-full">
            <input
              type="text"
              name="location"
              onChange={city}
              onKeyUp={handleKeyPress}
              placeholder="Search by Location"
              className="outline-none w-full px-5 py-2 border-gray-300 rounded z-20"
            />

            <div className="absolute right-11 top-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-gray-400 hover:cursor-pointer hover:text-violet-500"
              >
                <path d="M20.94 11A8.994 8.994 0 0 0 13 3.06V2c0-.55-.45-1-1-1s-1 .45-1 1v1.06A8.994 8.994 0 0 0 3.06 11H2c-.55 0-1 .45-1 1s.45 1 1 1h1.06A8.994 8.994 0 0 0 11 20.94V22c0 .55.45 1 1 1s1-.45 1-1v-1.06A8.994 8.994 0 0 0 20.94 13H22c.55 0 1-.45 1-1s-.45-1-1-1zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7"></path>
              </svg>
            </div>

            <button onClick={handleSearch} className="absolute right-2 top-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                className="fill-current text-gray-400 hover:cursor-pointer hover:text-violet-500"
              >
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="relative text-white px-6 pb-6 mt-6">
          <img src="/sunny.png" alt="sunny" className="w-56 mx-auto" />

          <div className="text-center text-2xl mb-8 font-semibold">
            <h1>{deg}° C</h1>
            <h2>{district}</h2>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 32 32"
                  className="fill-current"
                >
                  <path d="M26 12a3.9 3.9 0 0 1-4-3.777a3.9 3.9 0 0 1 .653-2.064l2.517-3.745a1.038 1.038 0 0 1 1.66 0l2.485 3.696A3.97 3.97 0 0 1 30 8.223A3.9 3.9 0 0 1 26 12m0-7.237l-1.656 2.463a1.9 1.9 0 0 0-.344.997a2.014 2.014 0 0 0 4 0a2 2 0 0 0-.375-1.047zM23.5 30h-15a6.496 6.496 0 0 1-1.3-12.862a8.994 8.994 0 0 1 17.6 0A6.496 6.496 0 0 1 23.5 30M16 12a7 7 0 0 0-6.941 6.145l-.1.812l-.815.064A4.496 4.496 0 0 0 8.5 28h15a4.496 4.496 0 0 0 .356-8.979l-.815-.064l-.099-.812A7 7 0 0 0 16 12"></path>
                </svg>
              </div>

              <div>
                <h1>91%</h1>
                <h2>Humidity</h2>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M4 10a1 1 0 0 1-1-1a1 1 0 0 1 1-1h8a2 2 0 0 0 2-2a2 2 0 0 0-2-2c-.55 0-1.05.22-1.41.59a.973.973 0 0 1-1.42 0c-.39-.39-.39-1.03 0-1.42C9.9 2.45 10.9 2 12 2a4 4 0 0 1 4 4a4 4 0 0 1-4 4zm15 2a1 1 0 0 0 1-1a1 1 0 0 0-1-1c-.28 0-.53.11-.71.29a.996.996 0 0 1-1.41 0c-.38-.39-.38-1.02 0-1.41C17.42 8.34 18.17 8 19 8a3 3 0 0 1 3 3a3 3 0 0 1-3 3H5a1 1 0 0 1-1-1a1 1 0 0 1 1-1zm-1 6H4a1 1 0 0 1-1-1a1 1 0 0 1 1-1h14a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-.83 0-1.58-.34-2.12-.88c-.38-.39-.38-1.02 0-1.41a.996.996 0 0 1 1.41 0c.18.18.43.29.71.29a1 1 0 0 0 1-1a1 1 0 0 0-1-1"></path>
                </svg>
              </div>

              <div>
                <h1>3.6 Km/h</h1>
                <h2>Wind Speed</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
