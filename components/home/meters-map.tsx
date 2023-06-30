import { getBaseUrl } from "@/shared/utils/apiUtil";
import { Meter } from "@/shared/utils/types";
import { Card, Loading, Text, Image } from "@nextui-org/react";
import {
  GoogleMap,
  InfoWindowF,
  LoadScriptNext,
  MarkerF,
} from "@react-google-maps/api";
import React from "react";
import { Flex } from "../styles/flex";

export const MetersMap = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [meters, setMeters] = React.useState<Meter[]>([]);
  React.useEffect(() => {
    const fetchMeters = async () => {
      const url = `${getBaseUrl()}/meter`;
      const response = await fetch(url);
      const data = await response.json();
      setMeters(data);
      setLoading(false);
    };
    fetchMeters();
  }, []);
  const containerStyle = {
    borderRadius: "10px",
    width: "100%",
    height: "100%",
  };
  const center = {
    lat: -16.606247,
    lng: -49.32579,
  };
  function handleMapLoad(mapInstance: any) {
    const bounds = new window.google.maps.LatLngBounds();
    for (const meter of meters) {
      const location = new window.google.maps.LatLng(
        meter.latitude,
        meter.longitude
      );
      bounds.extend(location);
    }
    mapInstance.fitBounds(bounds);
  }

  function handleMarkerHover(
    meter: Meter,
    resetExibitions: boolean = false
  ): void {
    meters.forEach((m) => {
      if (m.id === meter.id) {
        m.showInfoWindow = resetExibitions ? false : true;
      } else {
        m.showInfoWindow = false;
      }
    });
    setMeters([...meters]);
  }

  return (
    <Card
      css={{
        borderRadius: "$xl",
        px: "$6",
      }}
    >
      <Card.Header>
        <Text h4 css={{ textAlign: "center", width: "100%" }}>
          Mapa de Medidores
        </Text>
      </Card.Header>
      <Card.Body css={{ py: "$10", height: "400px", justifyContent: "center" }}>
        {loading ? (
          <Loading color="white" size="xl" />
        ) : (
          <LoadScriptNext googleMapsApiKey="AIzaSyDhpvUeNosfYN8CKWoqWCFgEESp2oBkdRM">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onLoad={(mapInstance) => handleMapLoad(mapInstance)}
              options={{
                clickableIcons: false,
                streetViewControl: false,
                styles: [
                  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                  {
                    elementType: "labels.text.stroke",
                    stylers: [{ color: "#242f3e" }],
                  },
                  {
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#746855" }],
                  },
                  {
                    featureType: "administrative.locality",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                  },
                  {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                  },
                  {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [{ color: "#263c3f" }],
                  },
                  {
                    featureType: "poi.park",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#6b9a76" }],
                  },
                  {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{ color: "#38414e" }],
                  },
                  {
                    featureType: "road",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#212a37" }],
                  },
                  {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#9ca5b3" }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [{ color: "#746855" }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#1f2835" }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#f3d19c" }],
                  },
                  {
                    featureType: "transit",
                    elementType: "geometry",
                    stylers: [{ color: "#2f3948" }],
                  },
                  {
                    featureType: "transit.station",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                  },
                  {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#17263c" }],
                  },
                  {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#515c6d" }],
                  },
                  {
                    featureType: "water",
                    elementType: "labels.text.stroke",
                    stylers: [{ color: "#17263c" }],
                  },
                ],
              }}
            >
              {meters.map((meter) => {
                return (
                  <MarkerF
                    key={meter.id}
                    icon={
                      meter.active
                        ? {
                            url: "/pin_icon_green.png",
                            scaledSize: { width: 30, height: 36 },
                          }
                        : {
                            url: "/pin_icon_red.png",
                            scaledSize: { width: 30, height: 36 },
                          }
                    }
                    position={{ lat: meter.latitude, lng: meter.longitude }}
                    title={meter.name}
                    onMouseOver={() => handleMarkerHover(meter)}
                  >
                    {meter.showInfoWindow ? (
                      <InfoWindowF
                        position={{ lat: meter.latitude, lng: meter.longitude }}
                        onCloseClick={() => handleMarkerHover(meter, true)}
                      >
                        <>
                          <Text h4 color="primary">
                            Medidor: {meter.name}
                          </Text>
                          <Text h6 color="primary">
                            Sigla: {meter.acronym}
                          </Text>
                          {meter.lastSincronization && (
                            <Text color="#16181A">
                              {"Última Medição: " +
                                new Date(
                                  meter.lastSincronization
                                ).toLocaleString()}
                            </Text>
                          )}
                        </>
                      </InfoWindowF>
                    ) : null}
                  </MarkerF>
                );
              })}
            </GoogleMap>
          </LoadScriptNext>
        )}
      </Card.Body>
      <Card.Footer>
        <Flex
          css={{
            width: "100%",
            gap: "$12",
            pb: "$5",
          }}
          justify={"end"}
        >
          <Flex
            css={{
              gap: "$3",
            }}
          >
            <Image
              src="/pin_icon_green.png"
              width={30}
              height={36}
              containerCss={{ margin: "0" }}
              alt="icone marcador verde"
            />
            <Text h4 css={{ textAlign: "end" }}>
              Ativos: {meters.filter((meter) => meter.active).length}
            </Text>
          </Flex>
          <Flex
            css={{
              gap: "$3",
            }}
          >
            <Image
              src="/pin_icon_red.png"
              width={30}
              height={36}
              containerCss={{ margin: "0" }}
              alt="icone marcador verde"
            />
            <Text h4 css={{ textAlign: "end" }}>
              Inativos: {meters.filter((meter) => !meter.active).length}
            </Text>
          </Flex>
        </Flex>
      </Card.Footer>
    </Card>
  );
};
