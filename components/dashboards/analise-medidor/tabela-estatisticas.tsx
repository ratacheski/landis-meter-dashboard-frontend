import { DataTable } from "@/components/table/data-table";
import { Card, Text } from "@nextui-org/react";
import { TableColumn } from "@/components/table/data-table.interface";
import React from "react";
import { Carousel } from "react-responsive-carousel";
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
    <Card
      css={{
        width: "100%",
        borderRadius: "$xl",
        px: "$6",
        height: "500px",
      }}
    >
      <Card.Header>
        <Text
          h3
          css={{
            textAlign: "center",
            width: "100%",
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
          width="100%"
        >
          {statisticalMeasurements.map((statistical, index) => {
            return (
              <DataTable
                key={index}
                selectionMode="none"
                ariaLabel="Tabela de dados estatísticos"
                columns={columns}
                data={[statistical]}
                showPagination={true}
              />
            );
          })}
        </Carousel>
      </Card.Body>
    </Card>
  );
};
