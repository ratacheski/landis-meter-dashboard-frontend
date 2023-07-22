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

export type AnalyticMeasurement = {
  variableName: string;
  instant?: number;
  value?: string;
  variableUnit?: string;
};


type Props = {
    analyticMeasurements: AnalyticMeasurement[];
  };


export const TabelaAnalitica = ({
  analyticMeasurements

  }: Props) => {
    const [loading, setLoading] = React.useState(false);

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
        <CSVLink
        key = {analyticMeasurements.length} 
        data={analyticMeasurements} 
        filename={"meter_data.csv"}>
            <Button>Download CSV</Button>
        </CSVLink>

        </Card.Header>
        <Card.Body>
        {(analyticMeasurements.length === 0) ? (
          <Text
            h4
            css={{
              textAlign: "center",
              "@lg": {
                textAlign: "center",
              },
            }}
          >
           Selecione um Medidor e uma Variável!
          </Text>
        ) : (
            <DataTable
            selectionMode="none"
            ariaLabel="Tabela de dados analiticos"
            columns={columns}
            data={analyticMeasurements} 
            showPagination={true}
            />
        )}
        

        </Card.Body>
    </Card>
    );
};

