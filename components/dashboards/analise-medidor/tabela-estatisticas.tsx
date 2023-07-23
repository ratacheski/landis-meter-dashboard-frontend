import { DataTable } from "@/components/table/data-table";
import { Card, Spacer, Text } from "@nextui-org/react";
import { TableColumn } from "@/components/table/data-table.interface";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Flex } from "@/components/styles/flex";
import { StatisticalMeasurement } from "@/shared/utils/types";

type Props = {
  statisticalMeasurements: StatisticalMeasurement[];
};

export const TabelaEstatisticas = ({ statisticalMeasurements }: Props) => {
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
        <Carousel autoPlay infiniteLoop showStatus={false} showArrows={false}>
          {statisticalMeasurements.map((statistical) => {
            return (
              <Flex
                key={statistical.name}
                align="center"
                direction="column"
                css={{
                  height: "330px",
                }}
              >
                <Text h3>{statistical.name}</Text>
                <Flex
                  align={"between"}
                >
                  <Text h5 weight={"extrabold"}>
                    Min:
                  </Text>
                  <Spacer />
                  <Text h6>
                    {statistical.min} {statistical.unit}
                  </Text>
                </Flex>
                <Flex align={"end"}>
                  <Text h5 weight={"extrabold"}>
                    Máx:
                  </Text>
                  <Spacer />
                  <Text h6>
                    {statistical.max} {statistical.unit}
                  </Text>
                </Flex>
                <Flex align={"end"}>
                  <Text h5 weight={"extrabold"}>
                    Média:
                  </Text>
                  <Spacer />
                  <Text h6>
                    {statistical.avg} {statistical.unit}
                  </Text>
                </Flex>
                <Flex align={"end"}>
                  <Text h5 weight={"extrabold"}>
                    Desvio Padrão:
                  </Text>
                  <Spacer />
                  <Text h6>
                    {statistical.std} {statistical.unit}
                  </Text>
                </Flex>
                <Flex align={"end"}>
                  <Text h5 weight={"extrabold"}>
                    Mediana:
                  </Text>
                  <Spacer />
                  <Text h6>
                    {statistical.median} {statistical.unit}
                  </Text>
                </Flex>
                <Flex align={"end"}>
                  <Text h5 weight={"extrabold"}>
                    Moda:
                  </Text>
                  <Spacer />
                  <Text h6>
                    {statistical.mode} {statistical.unit}
                  </Text>
                </Flex>
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
