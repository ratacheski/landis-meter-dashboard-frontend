import { Box } from "@/components/styles/box";
import { Flex } from "@/components/styles/flex";
import { Card, Grid, Text } from "@nextui-org/react";
import { InactivityRanking } from "./inactivity-ranking";
import { MetersMap } from "./meters-map";
import { getPublicBaseUrl } from "@/shared/utils/apiUtil";
import { useEffect, useState } from "react";
import { BigNumberCard } from "@/components/home/big-number-card.tsx";
import { CardBalance1 } from "./card-balance1";
import { CardBalance2 } from "./card-balance2";
import { CardBalance3 } from "./card-balance3";
type ContentProps = {};

export const Content = ({}: ContentProps) => {
  const [meterCount, setMeterCount] = useState<number | null>(null);
  const [inactiveMeterCount, setInactiveMeterCount] = useState<number | null>(
    null
  );
  const [activeMeterCount, setActiveMeterCount] = useState<number | null>(null);
  useEffect(() => {
    const fetchMeterCount = async () => {
      try {
        const url = `${getPublicBaseUrl()}/meter/count`;
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
        const url = `${getPublicBaseUrl()}/meter/count?active=False`;
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
        const url = `${getPublicBaseUrl()}/meter/count?active=True`;
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
              <BigNumberCard
                text="Quantidade De Medidores"
                cardNumber={meterCount}
                color="$blue500"
              />
            </Grid>
            <Grid lg={4} md={12}>
              <BigNumberCard
                text="Quantidade de Medidores Ativos"
                cardNumber={activeMeterCount}
                color="$green500"
              />
            </Grid>
            <Grid lg={4} md={12}>
              <BigNumberCard
                text="Quantidade de Medidores Inativos"
                cardNumber={inactiveMeterCount}
                color="$red500"
              />
            </Grid>
            <Grid lg={8} md={12}>
              <MetersMap />
            </Grid>
            <Grid lg={4} md={12}>
              <InactivityRanking />
            </Grid>
          </Grid.Container>
        </Flex>
      </Flex>
    </Box>
  );
};
