import { DataTable } from "@/components/table/data-table";
import { Card, Text } from "@nextui-org/react";
import { TableColumn } from "@/components/table/data-table.interface";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Flex } from "@/components/styles/flex";
export type StatisticalMeasurement = {
  avg: number;
  max?: number;
  median?: number;
  min?: number;
  mode?: number;
  std?: number;
};

type Props = {
  statisticalMeasurements: StatisticalMeasurement[];
};

export const TabelaEstatisticas = ({ statisticalMeasurements }: Props) => {
  const columns: TableColumn[] = [
    { name: "Min", uid: "min" },
    { name: "Máx", uid: "max" },
    { name: "Média", uid: "avg" },
    { name: "Desvio Padrão", uid: "std" },
    { name: "Mediana", uid: "median" },
    { name: "Moda", uid: "mode" },
  ];

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
          Estatisticas Descritivas
        </Text>
      </Card.Header>
      <Card.Body>
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showArrows={false}
        >
          {statisticalMeasurements.map((statistical, index) => {
            return (
              <Flex key={statistical.name} direction="column">
                <div key={index}>
                  <Text h3>{statistical.name}</Text>
                  <Text p>Min: {statistical.min}</Text>
                  <Text p>Máx: {statistical.max}</Text>
                  <Text p>Média: {statistical.avg}</Text>
                  <Text p>Desvio Padrão: {statistical.std}</Text>
                  <Text p>Mediana: {statistical.median}</Text>
                  <Text p>Moda: {statistical.mode}</Text>
                </div>
              </Flex>
            );
          })}
        </Carousel>
      </Card.Body>
    </Card>
  );
};






//
//<Card.Body>
//<Carousel
//  autoPlay
//  infiniteLoop
//  showStatus={false}
//  showArrows={false}
//>
//  {distributions.map((distribution, index) => {
//    return (
//      <Flex key={distribution.name} direction="column">
//        <Text
//          h3
//          css={{
//            width: "100%",
//            textAlign: "center",
//            "@lg": {
//              textAlign: "center",
//            },
//          }}
//        >
//          {distribution.name}
//        </Text>
//        <Chart
//          series={[distribution]}
//          options={{
//            ...distributionChartOptions,
//            colors: [distributionColors[index]],
//          }}
//          type="line"
//          height={250}
//        />
//      </Flex>
//    );
//  })}
//</Carousel>
//</Card.Body>