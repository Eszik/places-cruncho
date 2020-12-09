import React, { useState, useEffect } from "react";
import "./ResultList.css";

function ResultCard(props: {
  result: google.maps.places.PlaceResult;
  index: number;
  selected: boolean;
  distance: string;
  handleClick: () => void;
}) {
  return (
    <div
      className="result-card"
      style={{ backgroundColor: props.selected ? "lightgray" : "inherit" }}
      onClick={props.handleClick}
    >
      <div style={{ fontWeight: "bold" }}>
        <img src={props.result.icon} className="icon"></img> {props.result.name}
      </div>
      <div>{props.distance}</div>
      {props.selected && (
        <div>
          <div>{props.result.vicinity}</div>
          <div>{"€".repeat(props.result.price_level || 0)}</div>
          <div>{props.result.website}</div>
        </div>
      )}
      <div>
        {props.result.rating
          ? `${props.result.rating} ★ ${
              props.selected ? ` | ${props.result.user_ratings_total} avis` : ""
            }`
          : "Pas d'avis"}
      </div>
    </div>
  );
}

function ResultList(props: {
  results: google.maps.places.PlaceResult[];
  selectedPlaceIndex: number | undefined;
  position?: google.maps.LatLng;
  handleClick: (index: number) => void;
}) {
  const [distances, setDistances] = useState<string[]>([]);
  let service: google.maps.DistanceMatrixService;

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
        (res, status) => {
          if (status === "OK" && res.rows.length) {
            setDistances(res.rows[0].elements.map((el) => el.distance.text));
          }
        }
      );
    }
  }

  useEffect(() => {
    service = new google.maps.DistanceMatrixService();
    computeDistances();
  });

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
