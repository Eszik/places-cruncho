import React from "react";

function ResultCardExtended(props: { result: google.maps.places.PlaceResult }) {
  return (
    <div className="result-card" style={{ backgroundColor: "lightgray" }}>
      <div style={{ fontWeight: "bold" }}>
        <img src={props.result.icon} className="icon"></img> {props.result.name}
      </div>
      <div>{props.result.vicinity}</div>
      <div>{"€".repeat(props.result.price_level || 0)}</div>
      <div>
        {props.result.rating ? `${props.result.rating} stars` : "Pas d'avis"}
      </div>
    </div>
  );
}

export default ResultCardExtended;
