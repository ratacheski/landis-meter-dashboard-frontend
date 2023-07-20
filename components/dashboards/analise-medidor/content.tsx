import { Box } from "@/components/styles/box";
import { Flex } from "@/components/styles/flex";
import { getPublicBaseUrl } from "@/shared/utils/apiUtil";
import { Meter, Variable } from "@/shared/utils/types";
import { Grid } from "@nextui-org/react";
import React from "react";
import { toast } from "react-toastify";
import { DashFilter } from "./dash-filter";
import GraficoMedicoes from "./grafico-medicoes";
import NormalDistribution from "./normal-distribution";

type DashboardAnaliseMedidorProps = {
  variables: Variable[];
  meters: Meter[];
};
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
  const [granularity, setGranularity] = React.useState<string>("DAYS");
  const [selectedMeter, setSelectedMeter] = React.useState<string>("");
  const [selectedVariables, setSelectedVariables] = React.useState<string>("");
  async function handleMeasurements(
    selectedMeterValue: string,
    selectedVariableValues: string,
    startDate: Date | string,
    endDate: Date | string,
    newGranularity: string
  ) {
    const params = new URLSearchParams({
      meterID: selectedMeterValue,
      variables: selectedVariableValues,
      granularity: newGranularity || granularity,
    });
    setGranularity(newGranularity);
    setSelectedMeter(selectedMeterValue);
    setSelectedVariables(selectedVariableValues);
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
      const measurements = await resp.json();
      setDistributions(mapMeasurementsDistributions(measurements));
      setMeasurements(mapMeasurements(measurements));
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
    handleMeasurements(
      selectedMeter,
      selectedVariables,
      startPickedDate,
      endPickedDate,
      newGranularity
    );
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
          />
          <Grid.Container gap={2} justify="center">
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
          </Grid.Container>
        </Flex>
      </Flex>
    </Box>
  );
};

function mapMeasurements(measurements: any): ApexAxisChartSeries {
  return measurements.reduce(function (
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
}

function mapMeasurementsDistributions(measurements: any): ApexAxisChartSeries {
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
