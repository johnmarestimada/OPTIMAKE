// src/app/role/admin/dashboard/MapComponent.tsx
"use client";

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

// Fix default marker icons in Leaflet
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Building {
  id: number;
  name: string;
  location?: [number, number];
  floors: any[];
}

interface MapMarkerProps {
  position: [number, number];
  onPositionChange: (lat: number, lng: number) => void;
  editable: boolean;
}

const MapMarker: React.FC<MapMarkerProps> = ({ position, onPositionChange, editable }) => {
  // Handle map click events when in editable mode
  const map = useMapEvents(editable ? {
    click(e) {
      onPositionChange(e.latlng.lat, e.latlng.lng);
    }
  } : {});

  return position ? (
    <Marker 
      position={position} 
      draggable={editable}
      eventHandlers={
        editable ? {
          dragend: (e) => {
            const marker = e.target;
            const position = marker.getLatLng();
            onPositionChange(position.lat, position.lng);
          }
        } : {}
      }
    />
  ) : null;
};

interface MapComponentProps {
  position: [number, number];
  onPositionChange: (lat: number, lng: number) => void;
  buildings: Building[];
  zoom: number;
  height: string;
  editable: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  position, 
  onPositionChange, 
  buildings, 
  zoom, 
  height, 
  editable 
}) => {
  return (
    <MapContainer 
      center={position} 
      zoom={zoom} 
      style={{ height, width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Display the active marker if in editable mode */}
      {editable && (
        <MapMarker 
          position={position} 
          onPositionChange={onPositionChange}
          editable={editable}
        />
      )}
      
      {/* Display all building markers if not in editable mode */}
      {!editable && buildings.map(building => (
        building.location && (
          <Marker 
            key={building.id} 
            position={building.location}
            title={building.name}
          />
        )
      ))}
    </MapContainer>
  );
};

export default MapComponent;