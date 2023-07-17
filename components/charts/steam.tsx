import { Box } from "@/components/styles/box";
import { Text } from "@nextui-org/react";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

type ChartProps = {
  series: ApexAxisChartSeries;
  options: ApexOptions;
  noOptionMessage?: String;
  noResultMessage?: String;
  height?: string | number;
  type: ApexChart["type"];
};
export const Steam = ({
  series,
  noOptionMessage,
  noResultMessage,
  options,
  type,
  height = 425,
}: ChartProps) => {
  if (series && series[0]?.data.length > 0) {
    return (
      <Box
        css={{
          width: "100%",
          zIndex: 5,
        }}
      >
        <div id="chart">
          <Chart options={options} series={series} type={type} height={height} />
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
            ? noOptionMessage
            : noResultMessage || "Nenhum dado encontrado!"}
        </Text>
      </Box>
    );
  }
};
