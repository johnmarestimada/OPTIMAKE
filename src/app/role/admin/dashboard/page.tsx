"use client";

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from "react";

// Define TypeScript interfaces for our data structures
interface Room {
  id: number;
  name: string;
}

interface Floor {
  id: number;
  name: string;
  rooms: Room[];
}

interface Building {
  id: number;
  name: string;
  floors: Floor[];
  location?: [number, number]; // Latitude and longitude
}

// Dynamically import Leaflet components to avoid SSR issues
const MapComponent = dynamic(
  () => import('./MapComponent'),
  { ssr: false }
);

const ClassSchedulingDashboard: React.FC = () => {
  // State for buildings, selected building, etc.
  const [buildings, setBuildings] = useState<Building[]>([
    {
      id: 1,
      name: "College of Information Technology and Computing",
      floors: [{ id: 1, name: "Floor 1", rooms: [{ id: 1, name: "Room 1" }] }],
      location: [14.5995, 120.9842], // Example location for Manila
    },
    {
      id: 2,
      name: "College of Engineering and Architecture",
      floors: [{ id: 1, name: "Floor 1", rooms: [{ id: 1, name: "Room 1" }] }],
      location: [14.6010, 120.9876], // Example location
    }
  ]);
  
  const [selectedTab, setSelectedTab] = useState<string>("dashboard");
  const [newBuildingNo, setNewBuildingNo] = useState<string>("");
  const [newBuildingName, setNewBuildingName] = useState<string>("");
  const [selectedApparatus, setSelectedApparatus] = useState<string>("Apparatus");
  const [newFloorName, setNewFloorName] = useState<string>("Floor 1");
  const [newRoomName, setNewRoomName] = useState<string>("Room 1");
  
  // New state for the map location
  const [mapPosition, setMapPosition] = useState<[number, number]>([14.5995, 120.9842]); // Default to Manila
  
  // Building functions
  const addBuilding = (): void => {
    if (newBuildingName && newBuildingNo) {
      const newBuilding: Building = {
        id: buildings.length + 1,
        name: newBuildingName,
        floors: [{ id: 1, name: "Floor 1", rooms: [{ id: 1, name: "Room 1" }] }],
        location: mapPosition // Add the selected location
      };
      setBuildings([...buildings, newBuilding]);
      setNewBuildingName("");
      setNewBuildingNo("");
    }
  };
  
  const deleteBuilding = (id: number): void => {
    setBuildings(buildings.filter(building => building.id !== id));
  };
  
  // Floor functions
  const addFloor = (): void => {
    const updatedBuildings = [...buildings];
    const lastBuilding = updatedBuildings[updatedBuildings.length - 1];
    const floorId = lastBuilding.floors.length + 1;
    lastBuilding.floors.push({ id: floorId, name: `Floor ${floorId}`, rooms: [] });
    setBuildings(updatedBuildings);
  };
  
  // Room functions
  const addRoom = (): void => {
    const updatedBuildings = [...buildings];
    const lastBuilding = updatedBuildings[updatedBuildings.length - 1];
    const lastFloor = lastBuilding.floors[lastBuilding.floors.length - 1];
    const roomId = lastFloor.rooms ? lastFloor.rooms.length + 1 : 1;
    lastFloor.rooms.push({ id: roomId, name: `Room ${roomId}` });
    setBuildings(updatedBuildings);
  };

  // For client-side only rendering of the map component
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Function to update mapPosition from child component
  const updateMapPosition = (lat: number, lng: number) => {
    setMapPosition([lat, lng]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-60 bg-sky-400 text-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl mb-6 font-normal">Welcome, Admin</h2>
          
          <nav className="flex flex-col space-y-4">
            <button 
              className="text-white text-left font-normal underline"
              onClick={() => setSelectedTab("dashboard")}
            >
              Schedule
            </button>
            <button 
              className="text-white text-left font-normal"
              onClick={() => setSelectedTab("faculty")}
            >
              Faculty
            </button>
            <button 
              className="text-white text-left font-normal"
              onClick={() => setSelectedTab("rooms")}
            >
              Rooms
            </button>
            <button 
              className="text-white text-left font-normal"
              onClick={() => setSelectedTab("insights")}
            >
              Insights
            </button>
          </nav>
        </div>
        
        <button className="text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left panel (Buildings) */}
        <div className="w-1/3 p-4 border-r">
          <h2 className="text-2xl font-normal mb-4">Schedule dashboard</h2>
          
          <h3 className="text-xl font-medium mb-4">Buildings</h3>
          
          <div className="space-y-2">
            {buildings.map((building) => (
              <div 
                key={building.id} 
                className="p-4 bg-sky-300 text-white rounded flex justify-between items-center"
              >
                <span>{building.name}</span>
                <button 
                  onClick={() => deleteBuilding(building.id)}
                  className="text-white hover:text-red-600"
                >
                  ×
                </button>
              </div>
            ))}
            
            <button 
              className="p-4 bg-sky-300 text-white rounded flex items-center justify-between w-full"
              onClick={() => setSelectedTab("creation")}
            >
              <span>Create Building</span>
              <span className="text-xl">+</span>
            </button>
          </div>
        </div>
        
        {/* Right panel (Creation form) */}
        {selectedTab === "creation" && (
          <div className="w-2/3 p-4">
            <h2 className="text-2xl font-normal mb-4">Building creation</h2>
            
            <div className="mb-6">
              <h3 className="mb-2">Location</h3>
              <div className="bg-gray-200 h-64 mb-4 rounded overflow-hidden">
                {isMounted && (
                  <MapComponent 
                    position={mapPosition}
                    onPositionChange={updateMapPosition}
                    buildings={[]}
                    zoom={13}
                    height="100%"
                    editable={true}
                  />
                )}
              </div>
              
              <div className="flex space-x-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                  <input 
                    type="text" 
                    className="p-2 bg-sky-200 rounded w-full" 
                    value={mapPosition[0]}
                    onChange={(e) => {
                      const lat = parseFloat(e.target.value);
                      if (!isNaN(lat)) setMapPosition([lat, mapPosition[1]]);
                    }}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                  <input 
                    type="text" 
                    className="p-2 bg-sky-200 rounded w-full" 
                    value={mapPosition[1]}
                    onChange={(e) => {
                      const lng = parseFloat(e.target.value);
                      if (!isNaN(lng)) setMapPosition([mapPosition[0], lng]);
                    }}
                  />
                </div>
              </div>
              
              <input 
                type="text" 
                className="p-2 bg-sky-200 rounded w-full mb-2" 
                placeholder="Building no."
                value={newBuildingNo}
                onChange={(e) => setNewBuildingNo(e.target.value)}
              />
              <input 
                type="text" 
                className="p-2 bg-sky-200 rounded w-full" 
                placeholder="Building name"
                value={newBuildingName}
                onChange={(e) => setNewBuildingName(e.target.value)}
              />
            </div>
            
            <div className="flex mb-6">
              <div className="w-1/3 pr-2">
                <h3 className="mb-2">Floors</h3>
                <div className="bg-sky-200 p-2 rounded mb-2">Floor 1</div>
                <button 
                  className="flex items-center text-sm bg-sky-200 p-1 rounded"
                  onClick={addFloor}
                >
                  <span>Add floor</span>
                  <span className="ml-1 text-lg">+</span>
                </button>
              </div>
              
              <div className="w-1/3 px-2">
                <h3 className="mb-2">Rooms</h3>
                <div className="bg-sky-200 p-2 rounded mb-2">Room 1</div>
                <button 
                  className="flex items-center text-sm bg-sky-200 p-1 rounded"
                  onClick={addRoom}
                >
                  <span>Add room</span>
                  <span className="ml-1 text-lg">+</span>
                </button>
              </div>
              
              <div className="w-1/3 pl-2">
                <h3 className="mb-2">Apparatus</h3>
                <div className="bg-sky-200 p-2 rounded mb-2">Floor</div>
                <div className="bg-sky-200 p-2 rounded mb-2">Room</div>
                <div className="relative">
                  <button 
                    className="flex items-center justify-between w-full text-sm bg-sky-200 p-2 rounded"
                    onClick={() => setSelectedApparatus(selectedApparatus === "Apparatus" ? "" : "Apparatus")}
                  >
                    <span>Apparatus</span>
                    <span>▼</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                className="bg-sky-300 text-white px-4 py-2 rounded"
                onClick={addBuilding}
              >
                Create building
              </button>
            </div>
          </div>
        )}
        
        {/* Dashboard view (shown when not in creation mode) */}
        {selectedTab === "dashboard" && (
          <div className="w-2/3 p-4">
            <h2 className="text-2xl font-normal mb-4">Buildings Dashboard</h2>
            <p>Select 'Create Building' to add a new building.</p>
            
            {/* Display buildings with their locations on a map */}
            {isMounted && buildings.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg mb-2">Building Locations</h3>
                <div className="h-96 rounded overflow-hidden">
                  <MapComponent 
                    position={buildings[0].location || [14.5995, 120.9842]}
                    onPositionChange={() => {}}
                    buildings={buildings}
                    zoom={13}
                    height="100%"
                    editable={false}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassSchedulingDashboard;