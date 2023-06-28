import { Box } from "@/components/styles/box";
import { Flex } from "@/components/styles/flex";
import { Text } from "@nextui-org/react";

type ContentProps = {
};

export const Content = ({}: ContentProps) => {
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
          <Text h3>Home</Text>
        </Flex>
      </Flex>
    </Box>
  );
};
