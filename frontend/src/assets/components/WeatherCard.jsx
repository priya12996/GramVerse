import { useEffect, useState } from "react";
import { getWeather } from "../../services/weatherService";
import { getLocationName } from "../../services/locationService";

function getWeatherInfo(code) {
  if (code === 0) {
    return {
      icon: "☀️",
      text: "Clear Sky",
    };
  }

  if (code === 1 || code === 2) {
    return {
      icon: "🌤️",
      text: "Partly Cloudy",
    };
  }

  if (code === 3) {
    return {
      icon: "☁️",
      text: "Cloudy",
    };
  }

  if (code >= 45 && code <= 48) {
    return {
      icon: "🌫️",
      text: "Foggy",
    };
  }

  if (code >= 51 && code <= 57) {
    return {
      icon: "🌦️",
      text: "Drizzle",
    };
  }

  if (code >= 61 && code <= 67) {
    return {
      icon: "🌧️",
      text: "Rain",
    };
  }

  if (code >= 80 && code <= 82) {
    return {
      icon: "🌧️",
      text: "Rain Showers",
    };
  }

  if (code >= 95) {
    return {
      icon: "⛈️",
      text: "Thunderstorm",
    };
  }

  return {
    icon: "🌤️",
    text: "Weather",
  };
}

export default function WeatherCard() {
const [location, setLocation] = useState(null);
const [locationName, setLocationName] = useState(null);
const [weather, setWeather] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [loadingWeather, setLoadingWeather] = useState(false);

  const [error, setError] = useState("");


  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  setLocation({ latitude, longitude });
  setLoadingLocation(false);

  try {
    const place = await getLocationName(latitude, longitude);
    setLocationName(place);
  } catch (error) {
    console.error("Location name error:", error);
  }
},
      
      (error) => {
        console.error("Location Error:", error);

        setLoadingLocation(false);

        if (error.code === 1) {
          setError(
            "Location permission denied. Please allow location access."
          );
        } else if (error.code === 2) {
          setError("Unable to detect your location.");
        } else if (error.code === 3) {
          setError("Location request timed out.");
        } else {
          setError("Unable to get your location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, []);

  // Get weather using detected location
  useEffect(() => {
    if (!location) {
      return;
    }

    async function loadWeather() {
      try {
        setLoadingWeather(true);
        setError("");

        const data = await getWeather(
          location.latitude,
          location.longitude
        );

        setWeather(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load weather data.");
      } finally {
        setLoadingWeather(false);
      }
    }

    loadWeather();
  }, [location]);

  if (loadingLocation) {
    return (
      <div style={styles.card}>
        <h2 style={styles.title}>🌦️ Live Weather</h2>

        <p style={styles.message}>
          📍 Detecting your location...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.card}>
        <h2 style={styles.title}>🌦️ Live Weather</h2>

        <p style={styles.error}>{error}</p>

        <button
          style={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (loadingWeather || !weather) {
    return (
      <div style={styles.card}>
        <h2 style={styles.title}>🌦️ Live Weather</h2>

        <p style={styles.message}>
          Loading current weather...
        </p>
      </div>
    );
  }

  const current = weather.current;

  const weatherInfo = getWeatherInfo(
    current.weather_code
  );

  const rainProbability =
    weather.hourly?.precipitation_probability?.[0] ?? 0;

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>
            🌦️ Live Weather
          </h2>

         <p style={styles.locationText}>
  📍{" "}
  {locationName?.village ||
    locationName?.district ||
    "Your current location"}
  {locationName?.state
    ? `, ${locationName.state}`
    : ""}
</p>
        </div>

        <div style={styles.weatherIcon}>
          {weatherInfo.icon}
        </div>
      </div>

      <div style={styles.mainWeather}>
        <div style={styles.temperature}>
          {Math.round(current.temperature_2m)}°C
        </div>

        <div>
          <div style={styles.condition}>
            {weatherInfo.text}
          </div>

          <div style={styles.feels}>
            Feels like{" "}
            {Math.round(current.apparent_temperature)}°C
          </div>
        </div>
      </div>

      <div style={styles.stats}>
        <div style={styles.stat}>
          <span style={styles.statIcon}>💧</span>

          <strong>
            {current.relative_humidity_2m}%
          </strong>

          <small>Humidity</small>
        </div>

        <div style={styles.stat}>
          <span style={styles.statIcon}>💨</span>

          <strong>
            {Math.round(current.wind_speed_10m)} km/h
          </strong>

          <small>Wind</small>
        </div>

        <div style={styles.stat}>
          <span style={styles.statIcon}>🌧️</span>

          <strong>{rainProbability}%</strong>

          <small>Rain Chance</small>
        </div>
      </div>

      {rainProbability >= 60 && (
        <div style={styles.warning}>
          🌧️ High chance of rain. Check drainage
          and water-management conditions.
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "22px",
    marginBottom: "20px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e5e7eb",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
  },

  locationText: {
    margin: "6px 0 0",
    color: "#6b7280",
    fontSize: "14px",
  },

  weatherIcon: {
    fontSize: "48px",
  },

  mainWeather: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginTop: "20px",
  },

  temperature: {
    fontSize: "48px",
    fontWeight: "700",
  },

  condition: {
    fontSize: "18px",
    fontWeight: "600",
  },

  feels: {
    marginTop: "5px",
    color: "#6b7280",
    fontSize: "14px",
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    marginTop: "25px",
  },

  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "12px 8px",
    background: "#f9fafb",
    borderRadius: "10px",
    gap: "4px",
  },

  statIcon: {
    fontSize: "22px",
  },

  message: {
    color: "#6b7280",
    marginTop: "15px",
  },

  error: {
    color: "#dc2626",
    marginTop: "15px",
  },

  retryButton: {
    marginTop: "10px",
    border: "none",
    background: "#2563eb",
    color: "#ffffff",
    padding: "9px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  warning: {
    marginTop: "18px",
    padding: "12px",
    borderRadius: "10px",
    background: "#fff7ed",
    color: "#9a3412",
    fontSize: "14px",
  },
};