import React, { useState } from "react";
import { Box } from "../styles/box";
import Chart, { Props } from "react-apexcharts";
import { Loading, Text } from "@nextui-org/react";

type ChartProps = {
  series: Props["series"];
};
export const Steam = ({ series }: ChartProps) => {
  const options: Props["options"] = {
    chart: {
      type: "area",
      animations: {
        easing: "linear",
        speed: 800,
      },
      sparkline: {
        enabled: false,
      },
      brush: {
        enabled: false,
      },
      id: "basic-bar",
      fontFamily: "Inter, sans-serif",
      foreColor: "var(--nextui-colors-accents9)",
      stacked: true,
      toolbar: {
         show: true,
      }
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
    },

    xaxis: {
      type: "datetime",
      labels: {
        // show: false,
        style: {
          colors: "var(--nextui-colors-accents8)",
          fontFamily: "Inter, sans-serif",
        },
      },
      axisBorder: {
        color: "var(--nextui-colors-border)",
      },
      axisTicks: {
        color: "var(--nextui-colors-border)",
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "var(--nextui-colors-accents8)",
          fontFamily: "Inter, sans-serif",
        },
        formatter: function (value: any) {
          return value.toFixed(2);
        }
      },
    },
    tooltip: {
      theme: "dark",
      x: {
         format: "dd/MM/yy HH:mm",
      },
    },
    grid: {
      show: true,
      borderColor: "var(--nextui-colors-border)",
      strokeDashArray: 0,
      position: "back",
    },
    stroke: {
      curve: "smooth",
      fill: {
        colors: ["red"],
      },
    },
  };
  if (series[0]?.data.length > 0) {
    return (
      <Box
        css={{
          width: "100%",
          zIndex: 5,
        }}
      >
        <div id="chart">
          <Chart options={options} series={series} type="area" height={425} />
        </div>
      </Box>
    );
  } else {
    return (
      <Box
        css={{
          width: "100%",
          zIndex: 5,
        }}
      >
        <Text
          h4
          css={{
            textAlign: "center",
            "@lg": {
              textAlign: "center",
            },
          }}
        >
          {series?.length == 0
            ? "Selecione um Medidor e uma Variável!"
            : "Nenhum dado encontrado!"}
        </Text>
      </Box>
    );
  }
};
