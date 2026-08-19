import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";


function createRiskIcon(riskLevel, isSelected) {

  let color = "green";

  if (riskLevel === "Red") {
    color = "red";
  } else if (riskLevel === "Yellow") {
    color = "orange";
  }

  const size = isSelected ? 32 : 20;
  const border = isSelected ? 4 : 3;

  return L.divIcon({
    className: "",
    html: `
      <div
        style="
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border: ${border}px solid white;
          border-radius: 50%;
          box-shadow: ${
            isSelected
              ? "0 0 0 6px rgba(0, 0, 0, 0.25), 0 0 15px rgba(255, 255, 255, 0.9)"
              : "0 0 5px rgba(0,0,0,0.5)"
          };
          transition: all 0.2s ease;
        "
      ></div>
    `,
    iconSize: [size + border * 2, size + border * 2],
    iconAnchor: [
      (size + border * 2) / 2,
      (size + border * 2) / 2
    ],
    popupAnchor: [0, -(size / 2)]
  });
}


function MapView({ alerts, selectedAlert }) {

  return (

    <MapContainer
      center={[20.2961, 85.8245]}
      zoom={13}
      style={{
        height: "500px",
        width: "100%"
      }}
    >

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />


      {/* Create a marker for every backend alert */}

      {alerts.map((alert) => (

        <Marker
          key={alert.alert_id}
          position={[
            alert.latitude,
            alert.longitude
          ]}
          icon={createRiskIcon(alert.risk_level,
            selectedAlert?.alert_id === alert.alert_id)}
        >

          <Popup>

            <strong>
              {alert.alert_id}
            </strong>

            <br />

            Risk Score: {alert.risk_score}%

            <br />

            Risk Level: {alert.risk_level}

            <br />

            Status: {alert.status}

            <br />

            <br />

            <strong>
              Evidence:
            </strong>

            <br />

            {alert.evidence}

          </Popup>

        </Marker>

      ))}

    </MapContainer>

  );
}


export default MapView;