import { Box } from "@/components/styles/box";
import { Flex } from "@/components/styles/flex";
import { Card, Grid, Text } from "@nextui-org/react";
import { MetersMap } from "./meters-map";

type ContentProps = {};

export const Content = ({}: ContentProps) => {
  const MockItem = ({ text, height="$40" }:{text:string, height: string}) => {
    return (
      <Card css={{ h: height}}>
        <Card.Body>
          <Text h4 css={{ textAlign: "center", width: "100%" }}>
            {text}
          </Text>
        </Card.Body>
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
              <MockItem text="BigNumber1" />
            </Grid>
            <Grid lg={4} md={12}>
              <MockItem text="BigNumber2" />
            </Grid>
            <Grid lg={4} md={12}>
              <MockItem text="BigNumber3" />
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
