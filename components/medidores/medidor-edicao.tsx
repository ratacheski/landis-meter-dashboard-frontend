import React from "react";
import {Breadcrumbs, Crumb, CrumbLink} from "../breadcrumb/breadcrumb.styled";
import {HouseIcon} from "../icons/breadcrumb/house-icon";
import Link from "next/link";
import {Text} from "@nextui-org/react";
import {PaymentsIcon} from "../icons/sidebar/payments-icon";
import {Flex} from "../styles/flex";
import { FormMeter } from "./form-medidor"
import { Meter } from "../../shared/utils/types";


type MedidoresProps = {
    meter: Meter;
};

export const MedidorEdicao = ({meter}: MedidoresProps) => {

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
                    <HouseIcon/>
                    <Link href={"/"}>
                        <CrumbLink href="#">Home</CrumbLink>
                    </Link>
                    <Text>/</Text>
                </Crumb>

                <Crumb>
                    <PaymentsIcon/>
                    <Link href={"/medidores"}>
                        <CrumbLink href="#">Medidores</CrumbLink>
                    </Link>
                    <Text>/</Text>
                </Crumb>


                <Crumb>
                    <Link href={"/"}>
                        <CrumbLink href="#">{meter.id ? 'Edição de Medidor' : 'Novo Medidor'}</CrumbLink>
                    </Link>
                </Crumb>
            </Breadcrumbs>
            <FormMeter meter={meter}/>
        </Flex>
    );
};