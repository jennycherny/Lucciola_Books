import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const PickupMap = () => {
    useEffect(() => {
        // Создайте карту
        const mapElement = document.getElementById('pickup-map');
        const map = L.map(mapElement).setView([41.686628, 44.840647], 26);
    
        // Добавьте тайлы OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(map);
    
        // Добавьте маркер
        L.circleMarker([41.686628, 44.840647], { radius: 10, color: 'red'}).addTo(map);
      }, []);

    return (
        <div id="pickup-map" style={{ width: '100%', height: '400px' }}></div>
    );
};

export default PickupMap;