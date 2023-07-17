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
import { CSVLink } from 'react-csv';

type Props = {
    variables: Variable[];
    meters: Meter[];
    handleMeasurements: (measurements: any) => void;
    measurements: Measurements[];
  };

export const TabelaAnalitica = ({
    variables,
    meters,
    handleMeasurements,

  }: Props) => {

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
      { name: "Variável", uid: "variableName" },
      { name: "Data Medição", uid: "instant" },
      { name: "Valor", uid: "value" },
     { name: "Unidade de Medida", uid: "variableUnit" },
    ];

return (
    <Card
        css={{
        borderRadius: "$xl",
        px: "$6",
        height: "500px",
        }}
    >
        <Card.Header>
        <Text h4 css={{ textAlign: "center", width: "100%" }}>
            Dados Analiticos
        </Text>
        <CSVLink data={measurements} headers={columns}>
            <button>Download CSV</button>
        </CSVLink>
        </Card.Header>
        <Card.Body>
        {loading ? (
            <Loading color="white" size="xl" />
        ) : (
            <DataTable
            selectionMode="none"
            ariaLabel="Tabela de dados analiticos"
            columns={columns}
            data={measurements} 
            showPagination={true}
            />
        )}
        

        </Card.Body>
    </Card>
    );
};