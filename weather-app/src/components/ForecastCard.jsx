import Proptypes from "prop-types";

ForecastCard.propTypes = {
  forecast: Proptypes.object,
};

export default function ForecastCard({ forecast }) {
  if (!forecast) return null;

  const dailyForecast = [];
  const seenDays = new Set();

  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });

    if (!seenDays.has(day)) {
      seenDays.add(day);
      dailyForecast.push(item);
    }
  });

  return (
    <div className="mt-8 flex mx-auto">
      <div className="flex gap-4 overflow-x-auto">
        {dailyForecast.slice(0, 5).map((day, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-white/20 backdrop-blur-md p-4 rounded-xl text-white min-w-[120px] shadow-md"
          >
            <p className="font-semibold">
              {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <p className="text-2xl font-bold">{Math.round(day.main.temp)}°C</p>
            <p className="capitalize">{day.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
