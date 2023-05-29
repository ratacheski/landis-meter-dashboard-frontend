import React from "react";
import {Breadcrumbs, Crumb, CrumbLink} from "../breadcrumb/breadcrumb.styled";
import {HouseIcon} from "../icons/breadcrumb/house-icon";
import Link from "next/link";
import {Text} from "@nextui-org/react";
import {PaymentsIcon} from "../icons/sidebar/payments-icon";
import {Flex} from "../styles/flex";
import {FormVariable} from "./form-variable";


type VariaveisProps = {
    variable: Variable;
};
type Variable = {
    id?: string;
    name?: string;
    acronym?: string;
    unit?: string;
};

export const VariavelEdicao = ({variable}: VariaveisProps) => {

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
                    <Link href={"/variaveis"}>
                        <CrumbLink href="#">Variáveis</CrumbLink>
                    </Link>
                    <Text>/</Text>
                </Crumb>


                <Crumb>
                    <Link href={"/"}>
                        <CrumbLink href="#">{variable.id ? 'Edição de Variável' : 'Nova Variável'}</CrumbLink>
                    </Link>
                </Crumb>
            </Breadcrumbs>
            <FormVariable variable={variable}/>
        </Flex>
    );
};