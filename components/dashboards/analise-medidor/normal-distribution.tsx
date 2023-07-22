import { Card, Grid, Text } from "@nextui-org/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Flex } from "@/components/styles/flex";

const Chart = dynamic(
  () => import("@/components/charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);
export default function NormalDistribution({
  distributions,
}: {
  distributions: ApexAxisChartSeries;
}) {
  const distributionColors = [
    "#008FFB",
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0",
    "#546E7A",
    "#26a69a",
    "#D10CE8",
    "#FF66C3",
    "#4CAF50",
    "#D500F9",
  ];
  const distributionChartOptions: ApexOptions = {
    chart: {
      animations: {
        easing: "linear",
        speed: 800,
      },
      id: "basic-bar",
      fontFamily: "Inter, sans-serif",
      foreColor: "var(--nextui-colors-accents9)",
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      tickAmount: 10,
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      onItemClick: {
        toggleDataSeries: true,
      },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: function (value: any) {
          return value?.toFixed(3);
        },
      },
    },
    grid: {
      show: true,
      borderColor: "var(--nextui-colors-border)",
      position: "back",
    },
    stroke: {
      curve: "smooth",
    },
  };
  return (
    <Card>
      <Card.Header>
        <Text
          h3
          css={{
            textAlign: "center",
            "@lg": {
              textAlign: "inherit",
            },
          }}
        >
          Função Distribuição
        </Text>
      </Card.Header>
      <Card.Body>
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showArrows={false}
        >
          {distributions.map((distribution, index) => {
            return (
              <Flex key={distribution.name} direction="column">
                <Text
                  h3
                  css={{
                    width: "100%",
                    textAlign: "center",
                    "@lg": {
                      textAlign: "center",
                    },
                  }}
                >
                  {distribution.name}
                </Text>
                <Chart
                  series={[distribution]}
                  options={{
                    ...distributionChartOptions,
                    colors: [distributionColors[index]],
                  }}
                  type="line"
                  height={250}
                />
              </Flex>
            );
          })}
        </Carousel>
      </Card.Body>
    </Card>
  );
}
