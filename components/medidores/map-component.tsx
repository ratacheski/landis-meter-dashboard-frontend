import { GoogleMap, LoadScriptNext, MarkerF } from "@react-google-maps/api";

export default function MapComponent({ meter, onDragHandler, height }) {
  const containerStyle = {
    width: "100%",
    height: height || "600px",
  };
  const center = {
    lat: meter.latitude,
    lng: meter.longitude,
  };

  return (
    <>
      <LoadScriptNext googleMapsApiKey="AIzaSyDhpvUeNosfYN8CKWoqWCFgEESp2oBkdRM">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          <MarkerF
            position={center}
            draggable
            onDragEnd={(e) => onDragHandler(e)}
          />
        </GoogleMap>
      </LoadScriptNext>
    </>
  );
}
