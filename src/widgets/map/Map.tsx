import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import house from "../../../public/vite.svg"; // твоя иконка дома
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";

const houseIcon = new L.Icon({
  iconUrl: house, // используем импортированный путь
  iconSize: [32, 32], // можно подстроить размер под иконку
  iconAnchor: [16, 32], // точка, которая "втыкается" в карту (центр снизу)
  popupAnchor: [0, -32],
});

const markers = [
  { id: 1, lat: 43.32, lng: 45.69, text: "Английский замок" },
  { id: 2, lat: 43.31, lng: 45.7, text: "Грозный Молл" },
];

export default function Map() {
  return (
    <div className={styles.mapContainer}>
      <style>{`
        .leaflet-control-attribution {
          display: none !important;
        }
        .map-wrapper {
          width: 70%;
          margin: 0 auto;
        }
      `}</style>
      <div className={styles.mapWrapper}>
        <MapContainer
          center={[43.32, 45.69]}
          zoom={11}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((m) => (
            <Marker key={m.id} position={[m.lat, m.lng]} icon={houseIcon}>
              <Popup>{m.text}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
