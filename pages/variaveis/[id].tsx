import React from 'react'
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {VariavelEdicao} from "../../components/variaveis/variavel-edicao";
import {getBaseUrl} from "../../shared/utils/apiUtil";
import { Variable } from '../../shared/utils/types';

export default function variavelForm({variable}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <VariavelEdicao variable={variable}/>
    )
}

export const getServerSideProps: GetServerSideProps<{
    variable: Variable;
}> = async (context) => {
    let variable: Variable = {};
    if (context.params?.id !== 'novo') {
        const res = await fetch(`${getBaseUrl()}/variable/${context.params?.id}`);
        variable = await res.json();
    }
    return {props: {variable}};
};

