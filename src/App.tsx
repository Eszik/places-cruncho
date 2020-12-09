import React, { useState } from "react";
import "./App.css";
import GoogleMap from "./components/GoogleMap";
import ResultList from "./components/ResultList";

function App() {
  const [results, setResults] = useState<google.maps.places.PlaceResult[]>([]);
  const [selectedPlaceIndex, setSelectedPlaceIndex] = useState<number>();

  return (
    <div className="app">
      <div className="map-container">
        <GoogleMap
          handleResults={(results) => setResults(results)}
          handleClick={(index) => setSelectedPlaceIndex(index)}
        />
      </div>
      <ResultList
        results={results.slice(0, 10)}
        selectedPlaceIndex={selectedPlaceIndex}
        handleClick={(index) => setSelectedPlaceIndex(index)}
      />
    </div>
  );
}

export default App;
