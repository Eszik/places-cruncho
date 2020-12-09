import React from "react";
import ResultCard from "./ResultCard";
import "./ResultList.css";

function ResultList(props: {
  results: google.maps.places.PlaceResult[];
  selectedPlaceIndex: number | undefined;
  handleClick: (index: number) => void;
}) {
  return (
    <div className="result-list">
      {props.results.map((result, index) => (
        <ResultCard
          result={result}
          key={result.id}
          index={index}
          selected={index === props.selectedPlaceIndex}
          handleClick={() => props.handleClick(index)}
        />
      ))}
    </div>
  );
}

export default ResultList;
