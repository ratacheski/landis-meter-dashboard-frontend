import { Card, Text } from '@nextui-org/react';
import React from 'react';
import { Box } from '@/components/styles/box';
import { Flex } from '@/components/styles/flex';

export const BigNumberCard = ({ text, height="$40", cardNumber}:{text:string, height: string, cardNumber: string}) => {
    return (
        <Card css={{ h: height }}>
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
