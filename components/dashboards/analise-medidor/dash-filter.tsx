import { Box } from "@/components/styles/box";
import { Flex } from "@/components/styles/flex";
import { getPublicBaseUrl } from "@/shared/utils/apiUtil";
import { Meter } from "@/shared/utils/types";
import {
  Button,
  Dropdown,
  Input,
  Loading,
  Popover,
  Text,
} from "@nextui-org/react";
import React, { Key } from "react";
import { Search } from "react-iconly";
import { toast } from "react-toastify";

type Props = {
  handleMeasurements: (
    startDate: string,
    endDate: string,
    newGranularity: string
  ) => void;
  handleMeterSelection: (meter: Meter) => void;
};

export const DashFilter = ({
  handleMeasurements,
  handleMeterSelection,
}: Props) => {
  const [selectedMeter, setSelectedMeter] = React.useState<Set<Key>>(
    new Set([])
  );
  const [loading, setLoading] = React.useState(false);
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");
  const [meters, setMeters] = React.useState<Meter[]>([]);
  var typingTimer: NodeJS.Timeout;
  var doneTypingInterval = 1000;

  async function searchMeters(searchText: string) {
    if (searchText.length < 3) {
      toast.error("Digite pelo menos 3 caracteres!");
      return;
    }
    const url = `${getPublicBaseUrl()}/meter/name/${searchText}`;
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (resp.ok) {
      const meters: Meter[] = await resp.json();
      if (meters.length === 0){
        toast.warn("Não foram encontrados medidores com o termo pesquisado!");
        return;
      }
      setMeters(meters);
    } else {
      const { message } = await resp.json();
      toast.error(message);
    }
  }
  function onMeterSelection(selected: "all" | Set<Key>) {
    meters.filter((meter) => {
      if (meter.id === Array.from(selected)[0]) {
        handleMeterSelection(meter);
      }
    });
    setSelectedMeter(selected);
  }
  async function handleSearch() {
    console.log(selectedMeter);
    
    if (selectedMeter.size === 0) {
      toast.error("Selecione um medidor!");
      return;
    }
    setLoading(true);
    await handleMeasurements(startDate, endDate, "DAYS");
    setLoading(false);
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
          <Input
            placeholder="Pesquise pelo nome ou sigla de um medidor..."
            width="400px"
            onChange={(e) => {
              clearTimeout(typingTimer);
              typingTimer = setTimeout(() => {
                searchMeters(e.target.value);
              }, doneTypingInterval);
            }}
          />
          {meters.length > 0 && (
            <Dropdown>
              <Dropdown.Button css={{ tt: "capitalize" }}>
                {selectedMeter.size > 0
                  ? meters.find(
                      (meter) => meter.id === Array.from(selectedMeter)[0]
                    )?.name
                  : "Selecione um Medidor"}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Single selection actions"
                selectionMode="single"
                selectedKeys={selectedMeter}
                onSelectionChange={onMeterSelection}
              >
                {meters.map((meter) => (
                  <Dropdown.Item key={meter.id}>{meter.name}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}

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
