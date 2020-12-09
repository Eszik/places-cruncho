import React, { useEffect, useState } from "react";
import { markAsUntransferable } from "worker_threads";

function GoogleMap(props: {
  handleResults: (results: google.maps.places.PlaceResult[]) => void;
  handleClick: (index: number) => void;
}) {
  let map: google.maps.Map;
  let position: google.maps.LatLng;
  let service: google.maps.places.PlacesService;
  let resultArray: google.maps.places.PlaceResult[];
  const markers: Map<string, google.maps.Marker> = new Map();

  function sortResultsByRating(results: google.maps.places.PlaceResult[]) {
    return results.sort(
      (resA, resB) => (resB.rating || 0) - (resA.rating || 0)
    );
  }

  function initMap() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        position = new google.maps.LatLng(latitude, longitude);
        map = new google.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            center: position,
            zoom: 17,
          }
        );
        searchNearbyRestaurants();
      }
    );
  }

  function drawMarkers() {
    console.log(resultArray);
    for (const [index, result] of resultArray.entries()) {
      const newMarker = new google.maps.Marker({
        position: result.geometry?.location,
        map,
        title: result.name,
      });
      newMarker.addListener("click", () => props.handleClick(index));
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
      (results, status) => {
        resultArray = sortResultsByRating(results.slice(0, 10));
        props.handleResults(resultArray);
        drawMarkers();
      }
    );
  }

  useEffect(() => {
    const googleScript = document.getElementById(
      "google-maps-script"
    ) as HTMLScriptElement;
    googleScript.addEventListener("load", initMap);
    if (window.google) {
      initMap();
    }
  }, []);

  return <div id="map" style={{ height: "100%", width: "100%" }}></div>;
}

export default GoogleMap;
