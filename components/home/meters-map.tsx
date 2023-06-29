import { getBaseUrl } from "@/shared/utils/apiUtil";
import { Meter } from "@/shared/utils/types";
import { Card, Loading, Text, Image } from "@nextui-org/react";
import { GoogleMap, LoadScriptNext, MarkerF } from "@react-google-maps/api";
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
                  />
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
