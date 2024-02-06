// SidebarComponent.js

import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-sidebar-v2';

const SidebarComponent = ({ data }) => {
  const [sidebar, setSidebar] = useState(null);

  useEffect(() => {
    if (data) {
      // Wenn die Daten vorhanden sind, können Sie die Sidebar aktualisieren oder anpassen
      console.log(data);
    }
  }, [data]);

  const setupSidebar = (map) => {
    const newSidebar = L.control.sidebar({
      options: {
        container: 'sidebar',
        autopan: false,
        closeButton: true,
        position: 'left',
      },
    });
    setSidebar(newSidebar);
    newSidebar.addTo(map);
  };

  return <div id="sidebar"></div>;
};

export default SidebarComponent;
