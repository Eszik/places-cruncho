import { stringify } from "querystring";
import React, { useState, useEffect } from "react";
import ResultCard from "./ResultCard";
import "./ResultList.css";

function ResultList(props: {
  results: google.maps.places.PlaceResult[];
  selectedPlaceIndex: number | undefined;
  position?: google.maps.LatLng;
  handleClick: (index: number) => void;
}) {
  const [distances, setDistances] = useState<string[]>([]);
  const service = new google.maps.DistanceMatrixService();

  function computeDistances() {
    if (props.position) {
      service.getDistanceMatrix(
        {
          origins: [props.position],
          destinations: props.results.map(
            (result) =>
              result.geometry?.location || new google.maps.LatLng(0, 0)
          ),
          travelMode: google.maps.TravelMode.WALKING,
        },
        (res) => {
          if (res.rows.length) {
            setDistances(res.rows[0].elements.map((el) => el.distance.text));
          }
        }
      );
    }
  }

  useEffect(computeDistances, [props.position, props.results]);

  return (
    <div className="result-list">
      {props.results.map((result, index) => (
        <ResultCard
          result={result}
          key={result.name}
          index={index}
          selected={index === props.selectedPlaceIndex}
          distance={distances[index]}
          handleClick={() => props.handleClick(index)}
        />
      ))}
    </div>
  );
}

export default ResultList;
