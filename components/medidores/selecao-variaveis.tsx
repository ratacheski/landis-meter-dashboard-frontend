import { Variable } from "@/shared/utils/types";
import { Table, Text } from "@nextui-org/react";
import { Flex } from "../styles/flex";

export default function SelecaoVariaveis({
  variables,
  defaultVariables,
  handleSelection,
}: {
  variables: Variable[];
  defaultVariables?: Variable[];
  handleSelection: (variables: Variable[]) => void;
}) {
  return (
    <Flex justify={"center"} direction={"column"} css={{ width: "100%" }}>
      <Text h3>Variáveis</Text>
      <Table
        onSelectionChange={(e) => {
          if (e === "all") {
            return handleSelection(variables);
          }
          handleSelection(
            variables.filter((variable) =>
              Array.from(e).includes(variable.id.toString())
            )
          );
        }}
        defaultSelectedKeys={defaultVariables && [
          ...defaultVariables?.map((variable) => variable.id.toString()),
        ]}
        aria-label="Example static collection table with multiple selection"
        css={{
          height: "auto",
          minWidth: "100%",
          width: "100%",
        }}
        containerCss={{
          height: "auto",
          minWidth: "100%",
          width: "100%",
        }}
        selectionMode="multiple"
      >
        <Table.Header>
          <Table.Column>Variável</Table.Column>
          <Table.Column>Sigla</Table.Column>
          <Table.Column>Código</Table.Column>
          <Table.Column>Unidade</Table.Column>
        </Table.Header>
        <Table.Body>
          {variables.map((variable) => {
            return (
              <Table.Row key={variable.id}>
                <Table.Cell>{variable.name}</Table.Cell>
                <Table.Cell>{variable.acronym}</Table.Cell>
                <Table.Cell>{variable.code}</Table.Cell>
                <Table.Cell>{variable.unit}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Flex>
  );
}
