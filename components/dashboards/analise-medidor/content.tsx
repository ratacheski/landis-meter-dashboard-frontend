import { Box } from "@/components/styles/box";
import { Flex } from "@/components/styles/flex";
import { Measurements, Meter, Variable } from "@/shared/utils/types";
import { Card, Grid, Text } from "@nextui-org/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React from "react";
import { DashFilter } from "./dash-filter";

const Chart = dynamic(
  () => import("@/components/charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);
type DashboardAnaliseMedidorProps = {
  variables: Variable[];
  meters: Meter[];
};
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
export const DashboardAnaliseMedidor = ({
  variables,
  meters,
}: DashboardAnaliseMedidorProps) => {
  const [measurements, setMeasurements] = React.useState<ApexAxisChartSeries>(
    []
  );
  const [distributions, setDistributions] = React.useState<ApexAxisChartSeries>(
    []
  );
  const [granularity, setGranularity] = React.useState("DAYS");
  const [firstRender, setfirstRender] = React.useState(true);
  const granularityOptions = ["MONTH", "DAYS", "HOURS", "MINUTES"];
  const [pickedDate, setPickedDate] = React.useState(new Date());
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
          const { x } = data[dataPointIndex];
          let granIndex = granularityOptions.indexOf(granularity);
          if (granIndex === granularityOptions.length - 1) {
            granIndex = -1;
          }
          const nextGran = granularityOptions[granIndex + 1];
          setGranularity(nextGran);
          setTimeout(() => {
            setfirstRender(false);
            setPickedDate(x);
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
  function handleMeasurements(measurements: Measurements[]) {
    const measures: ApexAxisChartSeries = measurements.reduce(function (
      filtered: ApexAxisChartSeries,
      meas
    ) {
      if (meas.measurements) {
        var data = {
          name: meas.variableName,
          data: meas.measurements.map((m) => ({
            x: new Date(m.instant),
            y: parseFloat(m.value)?.toFixed(3),
          })),
          suffix: meas.variableUnit,
        };
        filtered.push(data);
      }
      return filtered;
    },
    []);

    const distributions: ApexAxisChartSeries = measurements.reduce(function (
      filtered: ApexAxisChartSeries,
      meas
    ) {
      if (meas?.statistics?.normalDistribution) {
        var data = {
          name: meas.variableName,
          data: meas.statistics.normalDistribution.map((m) => ({
            x: m.x?.toFixed(3),
            y: m.y,
          })),
        };
        filtered.push(data);
      }
      return filtered;
    },
    []);
    setDistributions(distributions);
    setMeasurements(measures);
  }
  return (
    <Box css={{ overflow: "hidden", height: "100%" }}>
      <Flex
        css={{
          width: "100%",
          gap: "$8",
          pt: "$5",
          height: "fit-content",
          flexWrap: "wrap",
          "@lg": {
            flexWrap: "nowrap",
          },
          "@sm": {
            pt: "$10",
          },
        }}
        justify={"center"}
      >
        <Flex
          css={{
            width: "100%",
            px: "$12",
            mt: "$8",
            "@xsMax": { px: "$10" },
            gap: "$12",
          }}
          direction={"column"}
        >
          <DashFilter
            meters={meters}
            variables={variables}
            handleMeasurements={handleMeasurements}
            handleReset={async () => {
              await setGranularity("DAYS");
              await setfirstRender(true);
            }}
            granularity={granularity}
            pickedDate={pickedDate}
            firstRender={firstRender}
          />
          <Grid.Container gap={2} justify="center">
            <Grid lg={9} md={12}>
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
                    Medições
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
            </Grid>
            <Grid lg={3} md={12}>
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
                  <Grid.Container gap={2} justify="center" direction="row">
                    {distributions.map((distribution, index) => {
                      return (
                        <Grid key={distribution.name} lg={12} md={12} direction="column">
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
                        </Grid>
                      );
                    })}
                  </Grid.Container>
                </Card.Body>
              </Card>
            </Grid>

            <Grid lg={3} md={12}></Grid>
          </Grid.Container>
        </Flex>
      </Flex>
    </Box>
  );
};
