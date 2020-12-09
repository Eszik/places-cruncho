import React, { useState } from "react";
import "./App.css";
import GoogleMap from "./components/GoogleMap";
import ResultList from "./components/ResultList";

function App() {
  const [results, setResults] = useState<google.maps.places.PlaceResult[]>([]);
  const [selectedPlaceIndex, setSelectedPlaceIndex] = useState<number>();
  const [position, setPosition] = useState<google.maps.LatLng>();

  return (
    <div className="app">
      <div className="map-container">
        <GoogleMap
          handleResults={(results) => setResults(results)}
          handleClick={(index) => setSelectedPlaceIndex(index)}
          handlePosition={(position) => setPosition(position)}
          selectedPlaceIndex={selectedPlaceIndex}
        />
      </div>
      <ResultList
        results={results.slice(0, 10)}
        selectedPlaceIndex={selectedPlaceIndex}
        position={position}
        handleClick={(index) => setSelectedPlaceIndex(index)}
      />
    </div>
  );
}

export default App;
