import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { Content } from "../components/home/content";
import { getBaseUrl } from "../shared/utils/apiUtil";
import { Meter, Variable } from "../shared/utils/types";

export default function Home({
   variables,
   meters,
 }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <Content variables={variables} meters={meters}/>;
};

export const getServerSideProps: GetServerSideProps<{
  variables: Variable[];
  meters: Meter[];
}> = async () => {
  const variableRequest = fetch(`${getBaseUrl()}/variable`).then((res) =>
    res.json()
  );
  const meterRequest = fetch(`${getBaseUrl()}/meter`).then((res) => res.json());

  const allData = await Promise.all([variableRequest, meterRequest]);
  return { props: { variables: allData[0], meters: allData[1] } };
};
