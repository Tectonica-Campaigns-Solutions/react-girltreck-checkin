import React from 'react';
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

const MAPBOX_TOKEN = "pk.eyJ1IjoiZ2lybHRyZWsiLCJhIjoiY2t2MTkwZzA1NmsyZDJvdDlsczZwczN1byJ9.HUnBdKS9XuAN71k4XM2CZg"

const mapContainerStyle = {
  width: "100%",
  height: "148px",
}

const Map = ({lat, lng}) => {
  const mapContainerRef = useRef(null)

  const [map, setMap] = useState(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      accessToken: MAPBOX_TOKEN,
      style: "mapbox://styles/mapbox/streets-v11",
      // center: [lng, lat]
      center: [lng, lat],
      zoom: 14,
      interactive: false
    })
    setMap(map)

    return () => map.remove()
  }, [])

  return (
    <div className="col-lg-5 offset-lg-4">
      <div ref={mapContainerRef} style={mapContainerStyle} />
    </div>
  )
}

export default Map;