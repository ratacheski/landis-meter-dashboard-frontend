import { Box } from "@/components/styles/box";
import { Flex } from "@/components/styles/flex";
import { getPublicBaseUrl } from "@/shared/utils/apiUtil";
import {
  Measurements,
  Meter,
  StatisticalMeasurement,
  Variable,
} from "@/shared/utils/types";
import { Card, Grid, Image, Text } from "@nextui-org/react";
import React from "react";
import { toast } from "react-toastify";
import { DashFilter } from "./dash-filter";
import GraficoMedicoes from "./grafico-medicoes";
import NormalDistribution from "./normal-distribution";
import SelecaoVariaveis from "./selecao-variaveis";
import { TabelaAnalitica } from "./tabela-analitica";
import { TabelaEstatisticas } from "./tabela-estatisticas";

export type AnalyticMeasurement = {
  variableName: string;
  instant?: number;
  value?: string;
  variableUnit?: string;
};

export const DashboardAnaliseMedidor = () => {
  const [measurements, setMeasurements] = React.useState<ApexAxisChartSeries>(
    []
  );
  const [distributions, setDistributions] = React.useState<ApexAxisChartSeries>(
    []
  );
  const [analyticMeasurements, setAnalyticMeasurements] =
    React.useState<AnalyticMeasurement[]>();
  const [statisticalMeasurements, setStatisticalMeasurements] = React.useState<
    StatisticalMeasurement[]
  >([]);
  const [granularity, setGranularity] = React.useState<string>("DAYS");
  const [selectedMeter, setSelectedMeter] = React.useState<Meter>();
  const [selectedVariables, setSelectedVariables] =
    React.useState<Variable[]>();

  async function handleMeasurements(
    startDate: Date | string,
    endDate: Date | string,
    newGranularity: string
  ) {
    if (!selectedVariables || selectedVariables?.length === 0) {
      toast.error("Selecione ao menos uma variável!");
      return;
    }
    const params = new URLSearchParams({
      meterID: selectedMeter?.id || "",
      variables: selectedVariables.map((v) => v.id).join(","),
      granularity: newGranularity || granularity,
      grouping: true.toString(),
    });
    setGranularity(newGranularity);

    if (startDate) {
      params.append("startDate", new Date(startDate).toISOString());
    }
    if (endDate) {
      params.append("endDate", new Date(endDate).toISOString());
    }

    const url = `${getPublicBaseUrl()}/measurement?`;
    const resp = await fetch(url + params.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (resp.ok) {
      const measurements: Measurements[] = await resp.json();
      setDistributions(mapMeasurementsDistributions(measurements));
      setMeasurements(mapMeasurements(measurements));
      setAnalyticMeasurements(mapAnalyticMeasurements(measurements));
      setStatisticalMeasurements(mapStatisticalMeasurements(measurements));
    } else {
      const { message } = await resp.json();
      toast.error(message);
    }
  }

  function handleMeasurementSelection({
    x,
    y,
    newGranularity,
  }: {
    x: Date;
    y: number;
    newGranularity: string;
  }) {
    let startPickedDate = new Date(x);
    let endPickedDate = new Date(x);
    switch (newGranularity) {
      case "MONTH":
        startPickedDate = new Date(x.getFullYear(), 0, 1);
        endPickedDate = new Date(x.getFullYear(), 11, 31);
        break;
      case "DAYS":
        startPickedDate = new Date(x.getFullYear(), x.getMonth(), 1);
        endPickedDate = new Date(x.getFullYear(), x.getMonth() + 1, 0);
        break;
      case "HOURS":
        startPickedDate.setUTCHours(0, 0, 0, 0);
        endPickedDate.setUTCHours(23, 59, 59, 999);
        break;
      case "MINUTES":
        startPickedDate.setUTCMinutes(0, 0, 0);
        endPickedDate.setUTCMinutes(59, 59, 999);
        break;
    }
    handleMeasurements(startPickedDate, endPickedDate, newGranularity);
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
            handleMeterSelection={(meter) => setSelectedMeter(meter)}
            handleMeasurements={handleMeasurements}
          />
          <Grid.Container justify="center">
            <Grid lg={12} md={12} css={{ paddingBottom: 12 }}>
              <SelecaoVariaveis
                key={selectedMeter?.id}
                variables={selectedMeter?.variables}
                handleSelection={(variables) => setSelectedVariables(variables)}
              />
            </Grid>
            <Grid lg={12} md={12}>
              {selectedMeter && selectedVariables && analyticMeasurements ? (
                <Grid.Container
                  gap={2}
                  justify="center"
                  css={{ paddingLeft: 0, paddingRight: 0 }}
                >
                  <Grid lg={9} md={12}>
                    <GraficoMedicoes
                      granularity={granularity}
                      measurements={measurements}
                      handleMeasurementSelection={handleMeasurementSelection}
                    />
                  </Grid>
                  <Grid lg={3} md={12}>
                    <NormalDistribution distributions={distributions} />
                  </Grid>
                  <Grid lg={9} md={12}>
                    <TabelaAnalitica
                      key={analyticMeasurements.length}
                      analyticMeasurements={analyticMeasurements}
                    />
                  </Grid>
                  <Grid lg={3} md={12}>
                    <TabelaEstatisticas
                      key={statisticalMeasurements.length}
                      statisticalMeasurements={statisticalMeasurements}
                    />
                  </Grid>
                </Grid.Container>
              ) : (
                <Card
                  css={{
                    borderRadius: "$xl",
                    px: "$6",
                    height: "500px",
                    justifyContent: "center",
                  }}
                >
                  <Card.Header>
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
                      <Image
                        src="/estatisticas.png"
                        height={"300px"}
                        alt="icone marcador verde"
                      />
                      <Text
                        h3
                        css={{
                          width: "100%",
                          textAlign: "center",
                          "@lg": {
                            textAlign: "center",
                          },
                          color: "gray",
                        }}
                      >
                        Selecione um Medidor e uma ou mais Variáveis
                      </Text>
                    </Flex>
                  </Card.Header>
                </Card>
              )}
            </Grid>
          </Grid.Container>
        </Flex>
      </Flex>
    </Box>
  );
};

function mapMeasurements(measurements: Measurements[]): ApexAxisChartSeries {
  return measurements.reduce(function (filtered: ApexAxisChartSeries, meas) {
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
  }, []);
}

function mapAnalyticMeasurements(
  measurements: Measurements[]
): AnalyticMeasurement[] {
  return measurements.reduce(function (filtered: AnalyticMeasurement[], meas) {
    if (meas.measurements) {
      meas.measurements.forEach((m) => {
        var data = {
          variableName: meas.variableName,
          variableUnit: meas.variableUnit,
          instant: new Date(m.instant).toLocaleString(),
          value: parseFloat(m.value)?.toFixed(3),
        };
        filtered.push(data);
      });
    }
    return filtered;
  }, []);
}

function mapStatisticalMeasurements(
  measurements: Measurements[]
): StatisticalMeasurement[] {
  return measurements.reduce(function (
    filtered: StatisticalMeasurement[],
    meas
  ) {
    if (meas.statistics) {
      var data = {
        name: meas.variableName,
        unit: meas.variableUnit,
        avg: meas.statistics.avg.toFixed(3),
        max: meas.statistics.max.toFixed(3),
        median: meas.statistics.median.toFixed(3),
        min: meas.statistics.min.toFixed(3),
        mode: meas.statistics.mode.toFixed(3),
        std: meas.statistics.std.toFixed(3),
      };
      filtered.push(data);
    }
    return filtered;
  },
  []);
}

function mapMeasurementsDistributions(
  measurements: Measurements[]
): ApexAxisChartSeries {
  return measurements.reduce(function (filtered: ApexAxisChartSeries, meas) {
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
  }, []);
}
