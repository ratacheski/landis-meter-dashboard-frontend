import { Button, Modal, Text } from "@nextui-org/react";
import {
  GoogleMap,
  LoadScriptNext,
  MarkerF,
} from "@react-google-maps/api";
import React from "react";

export default function MapModal({ meter, visible, closeHandler }) {
  const containerStyle = {
    width: "100%",
    height: "600px",
  };
  const center = {
    lat: meter.latitude,
    lng: meter.longitude,
  };

  const dragHandler = (e: google.maps.MapMouseEvent) => {
    meter.latitude = e?.latLng?.lat();
    meter.longitude = e?.latLng?.lng();        
  }
  return (
    <div>
      <Modal
        closeButton
        onClose={() => closeHandler()}
        aria-labelledby="modal-title"
        open={visible}
        width="700px"
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {meter.name}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <LoadScriptNext googleMapsApiKey="AIzaSyDhpvUeNosfYN8CKWoqWCFgEESp2oBkdRM">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            >
              <MarkerF position={center} draggable onDragEnd={dragHandler}/>
            </GoogleMap>
          </LoadScriptNext>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => closeHandler()}>
            Fechar
          </Button>
          <Button auto onPress={() => closeHandler(true)}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
