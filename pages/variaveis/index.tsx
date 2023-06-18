import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Variaveis } from '../../components/variaveis'
import {getBaseUrl} from "../../shared/utils/apiUtil";

type Variable = {
  id: string;
  code?: string;
  name: string;
  acronym: string;
  unit: string;
};

export default function variaveis({
  variables,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <Variaveis variables={variables}/>
  );
}

export const getServerSideProps: GetServerSideProps<{
  variables: Variable[];
}> = async () => {
  const res = await fetch(`${getBaseUrl()}/variable`);
  const variables = await res.json();
  return { props: { variables } };
};
