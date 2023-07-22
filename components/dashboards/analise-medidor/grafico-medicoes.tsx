import { Card, Text } from "@nextui-org/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(
  () => import("@/components/charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);

function toText(granularity: string) {
  switch (granularity) {
    case "MONTH":
      return "Mensais";
    case "DAYS":
      return "Diárias";
    case "HOURS":
      return "Horárias";
    case "MINUTES":
      return "Minuto";
    default:
      return "";
  }
}

export default function GraficoMedicoes({
  measurements,
  granularity,
  handleMeasurementSelection,
}: {
  measurements: ApexAxisChartSeries;
  granularity: string;
  handleMeasurementSelection: ({
    x,
    y,
    newGranularity,
  }: {
    x: Date;
    y: number;
    newGranularity: string;
  }) => void;
}) {
  const granularityOptions = ["MONTH", "DAYS", "HOURS", "MINUTES"];
  const measurementChartOptions: ApexOptions = {
    dataLabels: {
      enabled: false,
    },
    chart: {
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
      toolbar: {
        show: true,
      },
      events: {
        dataPointSelection: function (
          event: any,
          chartContext: any,
          config: any
        ) {
          const { dataPointIndex, seriesIndex } = config;
          const { series } = config.w.config;
          const { data } = series[seriesIndex];
          const { x, y } = data[dataPointIndex];
          let granIndex = granularityOptions.indexOf(granularity);
          if (granIndex === granularityOptions.length - 1) {
            granIndex = -1;
          }
          const nextGran = granularityOptions[granIndex + 1];
          setTimeout(() => {
            handleMeasurementSelection({
              x,
              y,
              newGranularity: nextGran,
            });
          }, 10);
        },
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

    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "var(--nextui-colors-accents8)",
          fontFamily: "Inter, sans-serif",
        },
        formatter: function (value: any) {
          return new Date(value).toLocaleString("pt-BR");
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
          return value?.toFixed(2);
        },
      },
      min: 0,
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "dd/MM/yy HH:mm",
      },
      y: {
        formatter: function (value: any, { seriesIndex, w }) {
          return (
            (value > 999
              ? (value / 1000).toFixed(3) + " k"
              : value.toFixed(3) + " ") + w.config.series[seriesIndex].suffix
          );
        },
      },
    },
    grid: {
      show: true,
      borderColor: "var(--nextui-colors-border)",
      strokeDashArray: 0,
      position: "back",
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
          Medições - {toText(granularity)}
        </Text>
      </Card.Header>
      <Card.Body>
        <Chart
          key={measurements.length}
          series={measurements}
          options={measurementChartOptions}
          noOptionMessage="Selecione um Medidor e uma Variável!"
          type="bar"
        />
      </Card.Body>
    </Card>
  );
}
