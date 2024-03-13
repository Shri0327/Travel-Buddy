import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapContainer = () => {
  const [currentPosition, setCurrentPosition] = useState(null);

  const mapStyles = {
    height: "100vh",
    width: "100%"
  };

  useEffect(() => {
    // Fetch user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        error => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleNavigateToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        error => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDtnPmw3rJGTqdCbNl_GAHvNK6XHEO-0aU">
      <div>
        <button onClick={handleNavigateToCurrentLocation}>Navigate to Current Location</button>
      </div>
      {currentPosition ? (
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={currentPosition}
        />
      ) : (
        <div>Loading...</div>
      )}
    </LoadScript>
  );
};

export default MapContainer;
