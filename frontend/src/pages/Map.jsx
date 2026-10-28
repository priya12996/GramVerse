import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  getVillages,
  createVillage,
  deleteVillage,
} from "../services/villageService";

import { useAuth } from "../hooks/useAuth";


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


const createEmojiIcon = (emoji) =>
  L.divIcon({
    html: `
      <div style="
        font-size: 26px;
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        border-radius: 50%;
        border: 2px solid #333;
        box-shadow: 0 2px 6px rgba(0,0,0,0.25);
      ">
        ${emoji}
      </div>
    `,
    className: "",
    iconSize: [42, 42],
    iconAnchor: [21, 21],
    popupAnchor: [0, -20],
  });


const icons = {
  house: createEmojiIcon("🏠"),
  school: createEmojiIcon("🏫"),
  hospital: createEmojiIcon("🏥"),
  water: createEmojiIcon("💧"),
  electricity: createEmojiIcon("⚡"),
  agriculture: createEmojiIcon("🌾"),
  panchayat: createEmojiIcon("🏛️"),
  complaint: createEmojiIcon("🚨"),
};



const villageObjects = [
  {
    id: 1,
    type: "house",
    name: "House #101",
    lat: 28.6142,
    lng: 77.2092,
    details: {
      owner: "Village Resident",
      members: 5,
      status: "Normal",
    },
  },

  {
    id: 2,
    type: "house",
    name: "House #102",
    lat: 28.6137,
    lng: 77.2085,
    details: {
      owner: "Village Resident",
      members: 4,
      status: "Normal",
    },
  },

  {
    id: 3,
    type: "school",
    name: "Government Primary School",
    lat: 28.6148,
    lng: 77.2098,
    details: {
      type: "Government School",
      students: 180,
      teachers: 8,
      status: "Operational",
    },
  },

  {
    id: 4,
    type: "hospital",
    name: "Primary Health Centre",
    lat: 28.6132,
    lng: 77.2105,
    details: {
      type: "Government PHC",
      doctors: 2,
      beds: 10,
      status: "Operational",
    },
  },

  {
    id: 5,
    type: "water",
    name: "Water Tank #01",
    lat: 28.6152,
    lng: 77.2088,
    details: {
      capacity: "10,000 L",
      currentLevel: "72%",
      lastRefilled: "2 days ago",
      status: "Good",
    },
  },

  {
    id: 6,
    type: "electricity",
    name: "Electric Pole #01",
    lat: 28.6140,
    lng: 77.2078,
    details: {
      voltage: "230 V",
      condition: "Good",
      lastInspection: "15 days ago",
      status: "Operational",
    },
  },

  {
    id: 7,
    type: "agriculture",
    name: "Agricultural Field #01",
    lat: 28.6125,
    lng: 77.2070,
    details: {
      crop: "Wheat",
      area: "2.5 acres",
      health: "Healthy",
      irrigation: "Available",
    },
  },

  {
    id: 8,
    type: "panchayat",
    name: "Gram Panchayat Office",
    lat: 28.6150,
    lng: 77.2110,
    details: {
      type: "Village Panchayat",
      services: "Public Services",
      status: "Open",
    },
  },

  {
    id: 9,
    type: "complaint",
    name: "Broken Handpump Complaint",
    lat: 28.6138,
    lng: 77.2100,
    details: {
      category: "Water",
      priority: "High",
      status: "Pending",
      reportedBy: "Citizen",
    },
  },
];



function Map() {
  const [villages, setVillages] = useState([]);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const { user } = useAuth();


  const [form, setForm] = useState({
    name: "",
    district: "",
    state: "",
    latitude: "",
    longitude: "",
    population: "",
    area: "",
  });


  const fetchVillages = async () => {
    try {
      const data = await getVillages();
      return data;
    } catch (error) {
      console.error("Error loading villages:", error);
      throw error;
    }
  };

  

  useEffect(() => {
    let isMounted = true;

    const loadInitialVillages = async () => {
      try {
        const data = await fetchVillages();

        if (isMounted) {
          setVillages(data);
        }
      } catch {
        if (isMounted) {
          setMessage("Unable to load villages.");
        }
      }
    };

    loadInitialVillages();

    return () => {
      isMounted = false;
    };
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");

      await createVillage({
        ...form,

        latitude: form.latitude
          ? Number(form.latitude)
          : null,

        longitude: form.longitude
          ? Number(form.longitude)
          : null,

        population: form.population
          ? Number(form.population)
          : null,

        area: form.area
          ? Number(form.area)
          : null,
      });

      // Reset form
      setForm({
        name: "",
        district: "",
        state: "",
        latitude: "",
        longitude: "",
        population: "",
        area: "",
      });

      setShowForm(false);

      // Refresh village list
      const updatedVillages = await fetchVillages();
      setVillages(updatedVillages);

      setMessage("Village added successfully.");
    } catch (error) {
      console.error("Error adding village:", error);

      setMessage(
        error.message || "Failed to add village."
      );
    }
  };


  const handleDelete = async (id) => {
    try {
      setMessage("");

      await deleteVillage(id);

      // Refresh village list
      const updatedVillages = await fetchVillages();
      setVillages(updatedVillages);

      setMessage("Village deleted successfully.");
    } catch (error) {
      console.error("Error deleting village:", error);

      setMessage("Failed to delete village.");
    }
  };

  

  const mapCenter = [28.6142, 77.2092];


  const getObjectEmoji = (type) => {
    const emojiMap = {
      house: "🏠",
      school: "🏫",
      hospital: "🏥",
      water: "💧",
      electricity: "⚡",
      agriculture: "🌾",
      panchayat: "🏛️",
      complaint: "🚨",
    };

    return emojiMap[type] || "📍";
  };


  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >

      <Link to="/">← Back to Home</Link>

      <h1 style={{ marginBottom: "5px" }}>
        🗺️ GramVerse Village Map
      </h1>

      <p style={{ color: "#555" }}>
        Interactive digital twin of the village.
      </p>


      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          background: "#fafafa",
        }}
      >
        <span>🏠 Houses</span>
        <span>🛣️ Roads</span>
        <span>🏫 Schools</span>
        <span>🏥 Hospitals</span>
        <span>💧 Water</span>
        <span>⚡ Electricity</span>
        <span>🌾 Agriculture</span>
        <span>🏛️ Panchayat</span>
        <span>🚨 Complaints</span>
      </div>


      {user && (
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            marginBottom: "20px",
            padding: "10px 15px",
            cursor: "pointer",
          }}
        >
          {showForm ? "Cancel" : "+ Add Village"}
        </button>
      )}

    

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginBottom: "30px",
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          {/* Village Name */}

          <div style={{ marginBottom: "10px" }}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Village name"
              required
              style={{
                width: "100%",
                padding: "10px",
              }}
            />
          </div>

          {/* District */}

          <div style={{ marginBottom: "10px" }}>
            <input
              name="district"
              value={form.district}
              onChange={handleChange}
              placeholder="District"
              required
              style={{
                width: "100%",
                padding: "10px",
              }}
            />
          </div>

          {/* State */}

          <div style={{ marginBottom: "10px" }}>
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              required
              style={{
                width: "100%",
                padding: "10px",
              }}
            />
          </div>

          {/* Latitude */}

          <div style={{ marginBottom: "10px" }}>
            <input
              name="latitude"
              value={form.latitude}
              onChange={handleChange}
              placeholder="Latitude (e.g. 28.6142)"
              type="number"
              step="any"
              required
              style={{
                width: "100%",
                padding: "10px",
              }}
            />
          </div>

          {/* Longitude */}

          <div style={{ marginBottom: "10px" }}>
            <input
              name="longitude"
              value={form.longitude}
              onChange={handleChange}
              placeholder="Longitude (e.g. 77.2092)"
              type="number"
              step="any"
              required
              style={{
                width: "100%",
                padding: "10px",
              }}
            />
          </div>

          {/* Population */}

          <div style={{ marginBottom: "10px" }}>
            <input
              name="population"
              value={form.population}
              onChange={handleChange}
              placeholder="Population"
              type="number"
              style={{
                width: "100%",
                padding: "10px",
              }}
            />
          </div>

          {/* Area */}

          <div style={{ marginBottom: "10px" }}>
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              placeholder="Area (sq km)"
              type="number"
              step="any"
              style={{
                width: "100%",
                padding: "10px",
              }}
            />
          </div>

          <button type="submit">
            Save Village
          </button>
        </form>
      )}


      {message && (
        <p
          style={{
            padding: "10px",
            background: "#f5f5f5",
            borderRadius: "6px",
          }}
        >
          {message}
        </p>
      )}

      <div
        style={{
          width: "100%",
          height: "600px",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #ddd",
          marginBottom: "30px",
        }}
      >
        <MapContainer
          center={mapCenter}
          zoom={16}
          scrollWheelZoom={true}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
       

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

        

          {villages.map((village) => {
            const latitude =
              Number(village.latitude) || mapCenter[0];

            const longitude =
              Number(village.longitude) || mapCenter[1];

            return (
              <Marker
                key={`village-${village.id}`}
                position={[latitude, longitude]}
              >
                <Popup>
                  <div style={{ minWidth: "200px" }}>
                    <h3 style={{ marginTop: 0 }}>
                      🏘️ {village.name}
                    </h3>

                    <p>
                      <strong>District:</strong>{" "}
                      {village.district}
                    </p>

                    <p>
                      <strong>State:</strong>{" "}
                      {village.state}
                    </p>

                    <p>
                      <strong>Latitude:</strong>{" "}
                      {village.latitude ?? "Not available"}
                    </p>

                    <p>
                      <strong>Longitude:</strong>{" "}
                      {village.longitude ?? "Not available"}
                    </p>

                    {village.population && (
                      <p>
                        <strong>Population:</strong>{" "}
                        {village.population}
                      </p>
                    )}

                    {village.area && (
                      <p>
                        <strong>Area:</strong>{" "}
                        {village.area} sq km
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}

                   {villageObjects.map((object) => (
            <Marker
              key={`${object.type}-${object.id}`}
              position={[object.lat, object.lng]}
              icon={icons[object.type]}
            >
              <Popup>
                <div
                  style={{
                    minWidth: "230px",
                  }}
                >
                  <h3
                    style={{
                      marginTop: 0,
                      marginBottom: "12px",
                    }}
                  >
                    {getObjectEmoji(object.type)}{" "}
                    {object.name}
                  </h3>

                  {Object.entries(object.details).map(
                    ([key, value]) => (
                      <p
                        key={key}
                        style={{
                          margin: "6px 0",
                        }}
                      >
                        <strong>
                          {key
                            .replace(
                              /([A-Z])/g,
                              " $1"
                            )
                            .replace(/^./, (str) =>
                              str.toUpperCase()
                            )}
                          :
                        </strong>{" "}
                        {value}
                      </p>
                    )
                  )}

                  {object.type === "complaint" && (
                    <button
                      style={{
                        marginTop: "8px",
                        padding: "7px 12px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        alert(
                          "Complaint management will be connected here."
                        )
                      }
                    >
                      View Complaint
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

          <CircleMarker
            center={[28.6143, 77.2088]}
            radius={8}
          >
            <Popup>
              <div style={{ minWidth: "200px" }}>
                <h3 style={{ marginTop: 0 }}>
                  🛣️ Road R-01
                </h3>

                <p>
                  <strong>Condition:</strong> Good
                </p>

                <p>
                  <strong>Length:</strong> 1.8 km
                </p>

                <p>
                  <strong>Last Repair:</strong> 2025
                </p>

                <p>
                  <strong>AI Maintenance Risk:</strong>{" "}
                  Low
                </p>
              </div>
            </Popup>
          </CircleMarker>
        </MapContainer>
      </div>

      

      <h2>Registered Villages</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "15px",
        }}
      >
        {villages.map((village) => (
          <div
            key={village.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
            }}
          >
            <h3
              style={{
                margin: "0 0 8px",
              }}
            >
              {village.name}
            </h3>

            <p
              style={{
                margin: "0 0 4px",
                color: "#555",
              }}
            >
              {village.district},{" "}
              {village.state}
            </p>

            {village.population && (
              <p
                style={{
                  margin: "0 0 4px",
                  fontSize: "14px",
                }}
              >
                Population:{" "}
                {village.population}
              </p>
            )}

            {village.area && (
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: "14px",
                }}
              >
                Area: {village.area} sq km
              </p>
            )}

            {village.latitude && village.longitude && (
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: "13px",
                  color: "#555",
                }}
              >
                📍 {village.latitude}, {village.longitude}
              </p>
            )}

            {user && (
              <button
                onClick={() =>
                  handleDelete(village.id)
                }
                style={{
                  fontSize: "13px",
                }}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      {villages.length === 0 && (
        <p>No villages added yet.</p>
      )}
    </div>
  );
}

export default Map;
