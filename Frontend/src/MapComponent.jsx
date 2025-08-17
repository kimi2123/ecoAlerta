import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({onMapClick}) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    // Obtener la ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]); // Establecer la posición en el estado
      });
    }
  }, []);

  function ClickHandler() {
    useMapEvents({
      click(e) {
        if (onMapClick) {
          const {latLng, lng } = e.latlng;
          onMapClick(latLng, lng);
        }
      },
    });
    return null;
  }


  return (
    <div style={{ height: '500px', width: '100%' }}>
      {position ? (
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}>
            <Popup>Your location</Popup>
          </Marker>
          {onMapClick && <ClickHandler />}
        </MapContainer>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MapComponent;