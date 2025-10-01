import React, { useEffect, useState } from "react";
import axios from "axios";

interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  icon: string;
}

const defaultCities = ["Mumbai", "Delhi", "Bangalore"];

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const API_KEY = "f7f5f7db327bdf6ff08e01e0fb175d3c";

  const fetchWeatherForCities = async (cities: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const promises = cities.map(async (city) => {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = res.data;
        return {
          city: data.name,
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        };
      });

      const results = await Promise.all(promises);
      setWeatherData(results);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherForCity = async (city: string) => {
    if (!city) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = res.data;
      setWeatherData([
        {
          city: data.name,
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        },
      ]);
    } catch (err) {
      console.error(err);
      setError("City not found. Please try again.");
      setWeatherData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherForCities(defaultCities);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeatherForCity(search.trim());
    setSearch("");
  };

  return (
    <section className="container mx-auto px-4 py-16 max-w-5xl">
      <h1 className="text-4xl font-serif font-bold text-foreground mb-6 text-center">
        Weather Updates
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-center">
        Get real-time weather updates for your city or major cities. Track
        temperatures, conditions, and plan your day.
      </p>

      {/* Search Input */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-10 gap-2 max-w-md mx-auto"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter city name..."
          className="flex-1 p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
        >
          Search
        </button>
      </form>

      {loading && (
        <p className="text-center text-muted-foreground text-lg">Loading...</p>
      )}

      {error && (
        <p className="text-center text-destructive text-lg mb-4">{error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {weatherData.map((weather) => (
          <div
            key={weather.city}
            className="bg-card p-6 rounded-2xl shadow hover:shadow-lg transition text-center flex flex-col items-center gap-2"
          >
            <h3 className="font-semibold text-xl text-foreground">
              {weather.city}
            </h3>
            <img
              src={weather.icon}
              alt={weather.condition}
              className="w-20 h-20"
            />
            <p className="text-3xl font-bold text-foreground">
              {weather.temp}°C
            </p>
            <p className="text-muted-foreground text-lg">{weather.condition}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Weather;
