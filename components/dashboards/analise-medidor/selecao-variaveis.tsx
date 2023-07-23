import { Flex } from "@/components/styles/flex";
import { Variable } from "@/shared/utils/types";
import { Checkbox, Table, Text } from "@nextui-org/react";

export default function SelecaoVariaveis({
  variables,
  handleSelection,
}: {
  variables?: Variable[];
  defaultVariables?: Variable[];
  handleSelection: (variables: Variable[]) => void;
}) {
  return (
    <Flex justify={"start"} direction={"column"} css={{ width: "100%" }}>
      {variables && (
        <Checkbox.Group
          label="Variáveis"
          orientation="horizontal"
          color="primary"
          onChange={(e) => {
            handleSelection(
              variables?.filter((variable) =>
                Array.from(e).includes(variable.id.toString())
              )
            );
          }}
        >
          {variables.map((variable) => {
            return (
              <Checkbox
                key={variable.id}
                value={variable.id}
                label={variable.name}
              />
            );
          })}
        </Checkbox.Group>
      )}
    </Flex>
  );
}
