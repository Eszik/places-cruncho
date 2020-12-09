import React, { useEffect, useRef, useState } from "react";

function GoogleMap(props: {
  handleResults: (results: google.maps.places.PlaceResult[]) => void;
  handleClick: (index: number) => void;
  handlePosition: (position: google.maps.LatLng) => void;
  selectedPlaceIndex: number | undefined;
}) {
  let map: google.maps.Map;
  let position: google.maps.LatLng;
  let service: google.maps.places.PlacesService;
  const markers: Map<string, google.maps.Marker> = new Map();

  const mapElementRef = useRef<HTMLDivElement>(null);

  function sortResultsByRating(results: google.maps.places.PlaceResult[]) {
    return results.sort(
      (resA, resB) => (resB.rating || 0) - (resA.rating || 0)
    );
  }

  function initMap() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        position = new google.maps.LatLng(latitude, longitude);
        map = new google.maps.Map(mapElementRef.current as HTMLDivElement, {
          center: position,
          zoom: 17,
        });
        props.handlePosition(position);
        new google.maps.Marker({
          position,
          map,
          title: "Vous êtes ici",
          label: "!",
        }).addListener("click", () => {
          map.panTo(position);
        });
        searchNearbyRestaurants();
      },
      undefined,
      { enableHighAccuracy: true }
    );
  }

  function drawMarkers(results: google.maps.places.PlaceResult[]) {
    for (const [index, result] of results.entries()) {
      const newMarker = new google.maps.Marker({
        position: result.geometry?.location,
        map,
        title: result.name,
      });
      newMarker.addListener("click", () => {
        map.panTo(newMarker.getPosition() as google.maps.LatLng);
        props.handleClick(index);
      });
      markers.set(result.id as string, newMarker);
    }
  }

  function searchNearbyRestaurants() {
    service = new google.maps.places.PlacesService(
      map as google.maps.Map<Element>
    );
    service.nearbySearch(
      {
        location: position,
        rankBy: google.maps.places.RankBy.DISTANCE,
        type: "restaurant",
      },
      (resultArray, status) => {
        const newResults = sortResultsByRating(resultArray.slice(0, 10));
        props.handleResults(newResults);
        drawMarkers(newResults);
      }
    );
  }

  useEffect(initMap, []);

  return (
    <div
      id="map"
      ref={mapElementRef}
      style={{ height: "100%", width: "100%" }}
    ></div>
  );
}

export default GoogleMap;
