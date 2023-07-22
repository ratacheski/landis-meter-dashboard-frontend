import { Box } from "@/components/styles/box";
import { Flex } from "@/components/styles/flex";
import { Meter, Variable } from "@/shared/utils/types";
import { Button, Dropdown, Input, Loading, Text } from "@nextui-org/react";
import React, { Key } from "react";
import { Search } from "react-iconly";
import { toast } from "react-toastify";

type Props = {
  variables: Variable[];
  meters: Meter[];
  handleMeasurements: (
    selectedMeterValue: string,
    selectedVariableValues: string,
    startDate: string,
    endDate: string,
    newGranularity: string
  ) => void;
};

export const DashFilter = ({
  variables,
  meters,
  handleMeasurements,
  measurements,
}: Props) => {
  const [selectedMeter, setSelectedMeter] = React.useState<Set<Key>>(
    new Set([])
  );
  const [loading, setLoading] = React.useState(false);
  const [startDate, setStartDate] = React.useState<string>('');
  const [endDate, setEndDate] = React.useState<string>('');
  const selectedMeterValue = React.useMemo(
    () => Array.from(selectedMeter).join(",").replaceAll("_", " "),
    [selectedMeter]
  );
  const [selectedVariable, setSelectedVariable] = React.useState<Set<Key>>(
    new Set([])
  );
  const selectedVariableValues = React.useMemo(
    () => Array.from(selectedVariable).join(",").replaceAll("_", " "),
    [selectedVariable]
  );

  async function handleSearch() {
    if (!selectedMeterValue) {
      toast.error("Selecione um medidor!");
      return;
    }
    if (!selectedVariableValues) {
      toast.error("Selecione uma variável!");
      return;
    }
    setLoading(true);
    await handleMeasurements(selectedMeterValue, selectedVariableValues, startDate, endDate, "DAYS");
    setLoading(false);
  }

  function computeSelectVariableName() {
    const selVariables = variables.filter((variable) =>
      selectedVariableValues.split(",").includes(variable.id)
    );
    const firstVariableString = selVariables.map(
      (variable) => variable.name + " - " + variable.acronym
    )[0];
    if (selVariables.length > 1) {
      return firstVariableString + " e mais " + (selVariables.length - 1);
    }
    return firstVariableString;
  }

  return (
    <Box>
      <Text
        h3
        css={{
          textAlign: "center",
          "@sm": {
            textAlign: "inherit",
          },
        }}
      >
        Visualização de Medições
      </Text>
      <Flex direction={"row"} justify={"between"} css={{ width: "100%" }}>
        <Flex
          css={{
            gap: "$10",
            flexWrap: "wrap",
            justifyContent: "start",
            "@sm": {
              flexWrap: "nowrap",
            },
          }}
          direction={"row"}
        >
          <Dropdown>
            <Dropdown.Button css={{ tt: "capitalize" }}>
              {selectedMeterValue
                ? meters.find((meter) => meter.id === selectedMeterValue)?.name
                : "Selecione um Medidor"}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              selectionMode="single"
              selectedKeys={selectedMeter}
              onSelectionChange={setSelectedMeter}
            >
              {meters.map((meter) => (
                <Dropdown.Item key={meter.id}>{meter.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Button css={{ tt: "capitalize", width: "250px" }}>
              {selectedVariableValues
                ? computeSelectVariableName()
                : "Selecione uma Variável"}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              selectionMode="multiple"
              selectedKeys={selectedVariable}
              onSelectionChange={setSelectedVariable}
            >
              {variables.map((variable) => (
                <Dropdown.Item key={variable.id}>
                  {variable.name + " (" + variable.unit + ")"}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Input
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            width="386px"
            css={{
              ".nextui-input-label--left": {
                width: "40%",
                justifyContent: "center",
              },
            }}
            labelLeft="Data Inicial"
            type="date"
          />
          <Input
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            width="386px"
            css={{
              ".nextui-input-label--left": {
                width: "40%",
                justifyContent: "center",
              },
            }}
            labelLeft="Data Final"
            type="date"
          />
        </Flex>
        {loading ? (
          <Button auto disabled css={{ px: "$13" }}>
            <Loading type="points" color="currentColor" size="sm" />
          </Button>
        ) : (
          <Button
            auto
            iconRight={<Search filled primaryColor="#ffffff" />}
            onPress={handleSearch}
          >
            Buscar
          </Button>
        )}
      </Flex>
    </Box>
  );
};
