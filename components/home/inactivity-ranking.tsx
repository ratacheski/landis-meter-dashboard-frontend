import { getBaseUrl } from "@/shared/utils/apiUtil";
import { Meter } from "@/shared/utils/types";
import { Card, Loading, Text } from "@nextui-org/react";
import React from "react";
import { DataTable } from "../table/data-table";
import { TableColumn } from "../table/data-table.interface";

export const InactivityRanking = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [meters, setMeters] = React.useState<Meter[]>([]);
  const columns: TableColumn[] = [
    { name: "Nome", uid: "name" },
    { name: "Sigla", uid: "acronym" },
    { name: "Dias inativo", uid: "daysInactive" },
  ];
  React.useEffect(() => {
    const fetchMeters = async () => {
      const url = `${getBaseUrl()}/meter/inactive`;
      const response = await fetch(url);
      const data = await response.json();
      setMeters(data);
      setLoading(false);
    };
    fetchMeters();
  }, []);
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
          Medidores Inativos
        </Text>
      </Card.Header>
      <Card.Body css={{ pt: "0"}}>
        {loading ? (
          <Loading color="white" size="xl" />
        ) : (
          <DataTable
            selectionMode="none"
            ariaLabel="Tabela de Medidores Inativos"
            columns={columns}
            data={meters}
            showPagination={false}
          />
        )}
      </Card.Body>
    </Card>
  );
};
