import { Text } from "@nextui-org/react";
import dynamic from "next/dynamic";
import React from "react";
import { Measurements, Meter, Variable } from "@/shared/utils/types";
import { Box } from "@/components/styles/box";
import { Flex } from "@/components/styles/flex";
import { DashFilter } from "./dash-filter";
import { Props } from "react-apexcharts";
import { TabelaAnalitica } from "./tabela-analitica";
import { TabelaEstatisticas } from "./tabela-estatisticas";
const Chart = dynamic(
  () => import("@/components/charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);


export type AnalyticMeasurement = {
  variableName: string;
  instant?: number;
  value?: string;
  variableUnit?: string;
};

export type StatisticalMeasurement = {
  avg: number;
  max?: number;
  median?: number;
  min?: number;
  mode?: number;
  std?: number;
};


type DashboardAnaliseMedidorProps = {
  variables: Variable[];
  meters: Meter[];
};

export const DashboardAnaliseMedidor = ({
  variables,
  meters,
}: DashboardAnaliseMedidorProps) => {
  const [measurements, setMeasurements] = React.useState<ApexAxisChartSeries>([]);
  const [analyticMeasurements, setAnalyticMeasurements] = React.useState<AnalyticMeasurement[]>([]);
  const [statisticalMeasurements, setStatisticalMeasurements] = React.useState<StatisticalMeasurement[]>([]);
  function handleMeasurements(filteredMeasurements: Measurements[]) {
    const measures: ApexAxisChartSeries = filteredMeasurements.reduce(function (
      filtered: ApexAxisChartSeries,
      meas
    ) {
      if (meas.measurements) {
        var data = {
          name: meas.variableName,
          data: meas.measurements.map((m) => ({
            x: new Date(m.instant),
            y: parseFloat(m.value).toFixed(3),
          })),
        }
        filtered.push(data);
      }
      return filtered;
    },
    []);
  

    const analyticMeasures: AnalyticMeasurement[] = filteredMeasurements.reduce(function (
      filtered: AnalyticMeasurement[],
      meas
    ) {
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
    },
    []);

    const statisticalMeasures: StatisticalMeasurement[] = filteredMeasurements.reduce(function (
      filtered: StatisticalMeasurement[],
      meas
    ) {
      if (meas.statistics) {
        var data = {
          name: meas.variableName,
          avg: parseFloat(meas.statistics.avg).toFixed(3),
          max: parseFloat(meas.statistics.max).toFixed(3),
          median: parseFloat(meas.statistics.median).toFixed(3),
          min: parseFloat(meas.statistics.min).toFixed(3),
          mode: parseFloat(meas.statistics.mode).toFixed(3),
          std: parseFloat(meas.statistics.std).toFixed(3),
        }
        filtered.push(data);
      }
      return filtered;
    },
    []);

    //console.log(filteredMeasurements)
    setAnalyticMeasurements(analyticMeasures);
    //setAnalyticMeasurements([{variableName:'Var1', instant: '123', value : '123', variableUnit : 'unit1'}])
    //setStatisticalMeasurements([{avg: 1, max: 2, median : 3, min : 4, mode : 3, std : 4}])
    setStatisticalMeasurements(statisticalMeasures)
    setMeasurements(measures);


    //
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
          {/* Card Section Top */}
          <DashFilter
            meters={meters}
            variables={variables}
            handleMeasurements={handleMeasurements}
          />

          {/* Chart */}
          <Box>
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
            <Box
              css={{
                width: "100%",
                backgroundColor: "$accents0",
                boxShadow: "$lg",
                borderRadius: "$2xl",
                px: "$10",
                py: "$10",
              }}
            >
              <Chart series={measurements} />
            </Box>
            
          </Box>
          <TabelaAnalitica 
            key = {analyticMeasurements.length}
            analyticMeasurements={analyticMeasurements}
          />       
          <TabelaEstatisticas
          key = {statisticalMeasurements.length}
          analyticMeasurements = {statisticalMeasurements}
          />

    
        </Flex>
      </Flex>
    </Box>
  );
};
