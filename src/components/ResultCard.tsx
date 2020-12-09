import React from "react";

function ResultCard(props: {
  result: google.maps.places.PlaceResult;
  index: number;
  selected: boolean;
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
      <div>{props.result.vicinity}</div>
      {props.selected && <div>{"€".repeat(props.result.price_level || 0)}</div>}
      <div>
        {props.result.rating ? `${props.result.rating} stars` : "Pas d'avis"}
      </div>
    </div>
  );
}

export default ResultCard;
