import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ResoMap = ({ countries }) => {
  // Zustand für die Länderdaten und die Farben
  const [countryColors, setCountryColors] = useState({});

  // Funktion zum Initialisieren der Länderfarben
  useEffect(() => {
    initializeCountryColors();
  }, [countries]);

  // Funktion zum Initialisieren der Länderfarben
  const initializeCountryColors = () => {
    const initialColors = {};
    // Annahme: Die Länderdaten enthalten eindeutige Schlüssel für jedes Land
    countries.features.forEach(country => {
      // Beispiel: Füge das Land zur Liste der Länderfarben hinzu
      initialColors[country.properties.ADMIN] = getCountryColor(country);
    });
    setCountryColors(initialColors);
  };

  // Funktion zum Abrufen der Farbe eines Landes basierend auf seinen Daten
  const getCountryColor = (country) => {
    let fillColor;
    // Annahme: Die Daten sind im properties-Objekt des Landes gespeichert
    const countryData = country.properties.data;
    // Logik zum Festlegen der Farbe basierend auf den Daten des Landes
    switch (countryData) {
      case "yes":
        fillColor = "green";
        break;
      case "no":
        fillColor = "red";
        break;
      case "absent":
        fillColor = "yellow";
        break;
      case "nv":
        fillColor = "gray";
        break;
      default:
        fillColor = "white";
    }
    return fillColor;
  };

  // Funktion zum Festlegen des Stils jedes Landes
  const mapStyle = (feature) => {
    return {
      fillColor: countryColors[feature.properties.ADMIN] || "white", // Standardfarbe
      weight: 1,
      color: "black",
      fillOpacity: 1,
    };
  };

  // Funktion für jeden Kreis
  const onEachCounty = (country, layer) => {
    const name = country.properties.ADMIN;
    layer.bindPopup(`${name}`);
  };

  return (
    <div>
      {/* Button zum Ändern der Farben */}
      <button onClick={initializeCountryColors}>Change Color</button>
      {/* Leaflet Karte */}
      <MapContainer
        style={{ height: "90vh" }}
        zoom={2}
        center={[20, 100]}
      >
        {/* GeoJSON-Schicht für die Länder */}
        <GeoJSON
          style={mapStyle}
          data={countries}
          onEachFeature={onEachCounty}
        />
      </MapContainer>
    </div>
  );
};

export default ResoMap;
