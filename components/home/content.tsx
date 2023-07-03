import { Box } from "@/components/styles/box";
import { Flex } from "@/components/styles/flex";
import { Card, Grid, Text } from "@nextui-org/react";
import { MetersMap } from "./meters-map";
import { getBaseUrl } from "@/shared/utils/apiUtil";
import { useEffect, useState } from "react";
import { BigNumberCard } from '@/components/home/big-number-card.tsx'
type ContentProps = {};

export const Content = ({}: ContentProps) => {
  const [meterCount, setMeterCount] = useState<number | null>(null);
  const [inactiveMeterCount, setInactiveMeterCount] = useState<number | null>(null);
  const [activeMeterCount, setActiveMeterCount] = useState<number | null>(null);
  useEffect(() => {
    const fetchMeterCount = async () => {
      try {
        const url = `${getBaseUrl()}/meter/count`
        const response = await fetch(url); 
        if (response.ok) {
          const count = await response.json();
          setMeterCount(count);
          console.error("Response:", response.statusText);
        } else {
          console.error("Error fetching meters:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching meters:", error);
      }
    };

    const fetchInactiveMeterCount = async () => {
      try {
        const url = `${getBaseUrl()}/meter/count?active=False`;
        const response = await fetch(url);
        if (response.ok) {
          const count = await response.json();
          setInactiveMeterCount(count);
        } else {
          console.error("Error fetching inactive meters:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching inactive meters:", error);
      }
    };

    const fetchActiveMeterCount = async () => {
      try {
        const url = `${getBaseUrl()}/meter/count?active=True`;
        const response = await fetch(url);
        if (response.ok) {
          const count = await response.json();
          setActiveMeterCount(count);
        } else {
          console.error("Error fetching active meters:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching active meters:", error);
      }
    };
    fetchActiveMeterCount();
    fetchMeterCount();
    fetchInactiveMeterCount();
  }, []);

  const MockItem = ({ text, height="$40", cardNumber}:{text:string, height: string, cardNumber: string}) => {
    return (
      <Card css={{ h: height}}>
        <Card.Body>
          <Text h4 css={{ textAlign: "center", width: "100%" }}>
            {text}
          </Text>
        </Card.Body>
        {cardNumber !== null && (
            <Text h2 css={{ textAlign: "center", width: "100%" }}>
              {cardNumber}
            </Text>
        )}
      </Card>
    );
  };
  return (
    <Box css={{ overflow: "hidden", height: "100%" }}>
      <Flex
        css={{
          width: "100%",
          gap: "$8",
          pt: "$5",
          height: "fit-content",
          flexWrap: "wrap",
          "@lg": {
            flexWrap: "nowrap",
          },
          "@sm": {
            pt: "$10",
          },
        }}
        justify={"center"}
      >
        <Flex
          css={{
            width: "100%",
            px: "$12",
            mt: "$8",
            "@xsMax": { px: "$10" },
            gap: "$12",
          }}
          direction={"column"}
        >
          <Grid.Container gap={2} justify="center">
            <Grid lg={4} md={12}>
              <BigNumberCard text="Quantidade De Medidores" cardNumber ={meterCount} />
            </Grid>
            <Grid lg={4} md={12}>
              <BigNumberCard text="Quantidade de Medidores Ativos" cardNumber = {activeMeterCount} />
            </Grid>
            <Grid lg={4} md={12}>
              <BigNumberCard text="Quantidade de Medidores Inativos" cardNumber = {inactiveMeterCount} />
            </Grid>
            <Grid lg={8} md={12}>
              <MetersMap />
            </Grid>
            <Grid lg={4} md={12}>
              <MockItem text="Ranking" height="$520"/>
            </Grid>
          </Grid.Container>
        </Flex>
      </Flex>
    </Box>
  );
};
