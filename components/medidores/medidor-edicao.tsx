import React from "react";
import {
  Breadcrumbs,
  Crumb,
  CrumbLink,
} from "@/components/breadcrumb/breadcrumb.styled";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import Link from "next/link";
import { Text } from "@nextui-org/react";
import { PaymentsIcon } from "@/components/icons/sidebar/payments-icon";
import { Flex } from "@/components/styles/flex";
import { FormMeter } from "./form-medidor";
import { Meter, Variable } from "@/shared/utils/types";

type MedidoresProps = {
  meter: Meter;
  variables: Variable[];
};

export const MedidorEdicao = ({ meter, variables }: MedidoresProps) => {
  return (
    <Flex
      css={{
        mt: "$5",
        px: "$6",
        "@sm": {
          mt: "$10",
          px: "$16",
        },
      }}
      justify={"center"}
      direction={"column"}
    >
      <Breadcrumbs>
        <Crumb>
          <HouseIcon />
          <Link href={"/"}>
            <CrumbLink href="#">Home</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>

        <Crumb>
          <PaymentsIcon />
          <Link href={"/medidores"}>
            <CrumbLink href="#">Medidores</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>

        <Crumb>
          <Link href={"/"}>
            <CrumbLink href="#">
              {meter.id ? "Edição de Medidor" : "Novo Medidor"}
            </CrumbLink>
          </Link>
        </Crumb>
      </Breadcrumbs>
      <FormMeter meter={meter} variables={variables} />
    </Flex>
  );
};
