import { Card, Text } from "@nextui-org/react";

export const BigNumberCard = ({
  text,
  height,
  cardNumber,
  color,
}: {
  text: string;
  height: string;
  cardNumber: string;
  color: string;
}) => {
  return (
    <Card css={{ h: height, bg: color }}>
      <Card.Body>
        <Text h4 css={{ textAlign: "center", width: "100%" }}>
          {text}
        </Text>
        {cardNumber !== null && (
          <Text h1 css={{ textAlign: "center", width: "100%" }}>
            {cardNumber}
          </Text>
        )}
      </Card.Body>
    </Card>
  );
};
