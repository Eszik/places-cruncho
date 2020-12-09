import React, { useState } from "react";

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
        {props.result.rating ? `${props.result.rating} ★` : "Pas d'avis"}{" "}
        {props.selected &&
          props.result.user_ratings_total &&
          ` | ${props.result.user_ratings_total} avis`}
      </div>
    </div>
  );
}

export default ResultCard;
