import React from 'react'
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {MedidorEdicao} from "../../components/medidores/medidor-edicao";
import { ToastContainer, toast } from 'react-toastify';
import {getBaseUrl} from "../../shared/utils/apiUtil";
import { Meter  } from '../../shared/utils/types';

export default function medidorForm({
  meter,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <MedidorEdicao meter={meter} />;
}

export const getServerSideProps: GetServerSideProps<{
  meter: Meter;
}> = async (context) => {
  let meter: Meter = {};
  
  if (context.params?.id !== 'novo') {
    const res = await fetch(`${getBaseUrl()}/meter/${context.params?.id}`);
    meter = await res.json();
  }
  return { props: { meter } };
};
