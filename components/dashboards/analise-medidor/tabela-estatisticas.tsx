import { Button, Dropdown, Input, Loading, Text } from "@nextui-org/react";
import React, { Key } from "react";
import { Search } from "react-iconly";
import { toast } from "react-toastify";
import { getPublicBaseUrl } from "@/shared/utils/apiUtil";
import { Meter, Variable, Measurements } from "@/shared/utils/types";
import { Box } from "@/components/styles/box";
import { Flex } from "@/components/styles/flex";
import { TableColumn } from "../table/data-table.interface";
import { Card } from "@nextui-org/react";
import { DataTable } from "@/components/table/data-table";
import { Carousel } from 'react-responsive-carousel';

type StatisticsCarouselProps  = {
    variables: Variable[];
    meters: Meter[];
    handleMeasurements: (measurements: any) => void;
    measurements: Measurements[];
  };

export const TabelaEstatisticas: React.FC<StatisticsCarouselProps> = ({
    variables,
    meters,
    handleMeasurements,

  }: StatisticsCarouselProps ) => {

    const [selectedMeter, setSelectedMeter] = React.useState<Set<Key>>(new Set([]));
    const [loading, setLoading] = React.useState(false);
    const [startDate, setStartDate] = React.useState();
    const [endDate, setEndDate] = React.useState();
    const selectedMeterValue = React.useMemo(
      () => Array.from(selectedMeter).join(",").replaceAll("_", " "),
      [selectedMeter]
    );
    const [selectedVariable, setSelectedVariable] = React.useState<Set<Key>>(new Set([]));
    const selectedVariableValues = React.useMemo(
      () => Array.from(selectedVariable).join(",").replaceAll("_", " "),
      [selectedVariable]
    );
    
    const [measurements, setMeasurements] = React.useState<Measurements[]>([]);
    React.useEffect(() => {
        handleMeasurements(measurements)

      }, [selectedMeterValue, selectedVariableValues]);



    const columns: TableColumn[] = [
      { name: "Min", uid: "min" },
      { name: "Máx", uid: "max" },
      { name: "Média", uid: "avg" },
      { name: "Desvio Padrão", uid: "std" },
      { name: "Mediana", uid: "median" },
      { name: "Moda", uid: "mode" },
    ];

return (
    <Carousel>
    <Card
        css={{
        borderRadius: "$xl",
        px: "$6",
        height: "500px",
        }}
    >
        <Card.Header>
        <Text h4 css={{ textAlign: "center", width: "100%" }}>
        Estatisticas Descritivas
        </Text>
        </Card.Header>
        <Card.Body>
        {loading ? (
            <Loading color="white" size="xl" />
        ) : (
            <DataTable
            selectionMode="none"
            ariaLabel="Estatisticas Descritivas"
            columns={columns}
            data={measurements} 
            showPagination={true}
            />
        )}
        </Card.Body>
    </Card>
    </Carousel>
    );
};