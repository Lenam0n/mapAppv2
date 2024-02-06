import React, { useState,useEffect,useRef } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";

const ResoMap = ({ countries }) => {

    

  const setupSidebar = (map) => {
      const newSidebar = L.control.sidebar({
          options: {
              container: "sidebar",
              autopan: false,
              closeButton: true,
              position: "left",
          },
      });
      sidebar.current = newSidebar;
      newSidebar.addTo(map);
  };


  const mapStyle = {
    fillColor: "white",
    weight: 1,
    color: "black",
    fillOpacity: 1,
  };



  const onEachCounty = (country, layer) => {
    const name = country.properties.ADMIN;
    layer.bindPopup(`${name}`);

    layer.on("click", () => {
      fetchMockData(country.properties.ADMIN)
        .then((result) => {
          const articleHeading = `<h1>${result.heading}</h1>`;
          const articleContent = `<p>${result.content}</p>`;
          sidebar.enablePanel("tab");
          sidebar.removePanel("tab");
          sidebar.addPanel({
            id: "tab",
            tab: "",
            title: articleHeading,
            pane: articleContent,
          });
          sidebar.open("tab");
        })
        .catch((error) => {
          const articleHeading = "<h1>Error</h1>";
          const articleContent = `<p>Error fetching data from the backend: ${error.message}</p>`;
          sidebar.enablePanel("tab");
          sidebar.removePanel("tab");
          sidebar.addPanel({
            id: "tab",
            tab: "",
            title: articleHeading,
            pane: articleContent,
          });
          sidebar.open("tab");
        });
    });
  };

  const fetchMockData = async (id) => {
    // Hier implementieren Sie die tatsächliche Datenabruflogik
    return { heading: "Test-Überschrift", content: "Test-Inhalt" };
  };

  return (
    <MapContainer
      style={{ height: "90vh" }}
      zoom={2}
      center={[20, 100]}
      whenCreated={setupSidebar}
    >
      <GeoJSON
        style={mapStyle}
        data={countries}
        onEachFeature={onEachCounty}
      />
      <div id="sidebar" className="leaflet-sidebar collapsed">
        {/* Hier kann der Inhalt der Sidebar platziert werden */}
      </div>
    </MapContainer>
  );
};

export default ResoMap;
