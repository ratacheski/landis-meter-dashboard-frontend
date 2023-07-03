import { Button, Modal, Text } from "@nextui-org/react";
import {
  GoogleMap,
  LoadScriptNext,
  MarkerF,
} from "@react-google-maps/api";
import React from "react";

export default function MapComponent({ meter, onDragHandler}) {
  const containerStyle = {
    width: "100%",
    height: "600px",
  };
  const center = {
    lat: meter.latitude,
    lng: meter.longitude,
  };


  return (
    <div>
        <Text id="modal-title" size={18}>
        {meter.name}
        </Text>
        <LoadScriptNext googleMapsApiKey="AIzaSyDhpvUeNosfYN8CKWoqWCFgEESp2oBkdRM">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
            <MarkerF position={center} draggable onDragEnd={(e) => onDragHandler(e)} />
        </GoogleMap>
        </LoadScriptNext>
    </div>
  );
}
