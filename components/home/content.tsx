import { Text } from "@nextui-org/react";
import dynamic from "next/dynamic";
import React from "react";
import { Measurements, Meter, Variable } from "../../shared/utils/types";
import { Box } from "../styles/box";
import { Flex } from "../styles/flex";
import { DashFilter } from "./dash-filter";
import { Props } from "react-apexcharts";

const Chart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);
type ContentProps = {
  variables: Variable[];
  meters: Meter[];
};

export const Content = ({ variables, meters }: ContentProps) => {
  const [measurements, setMeasurements] = React.useState<Props["series"]>([]);
  function handleMeasurements(measurements: Measurements[]) {
    const measures = measurements.map(meas => {
      return {
        name: meas.variableName,
        data: meas.measurements?.map((m) => ({
          x: new Date(m.instant * 1000),
          y: parseFloat(m.value).toFixed(3),
        }))
      }
    })
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
        </Flex>
      </Flex>
    </Box>
  );
};
