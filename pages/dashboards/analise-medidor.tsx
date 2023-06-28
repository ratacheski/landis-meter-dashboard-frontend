import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getBaseUrl } from "@/shared/utils/apiUtil";
import { Meter, Variable } from "@/shared/utils/types";
import { DashboardAnaliseMedidor } from "@/components/dashboards/analise-medidor/content";

export default function AnaliseMedidor({
   variables,
   meters,
 }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <DashboardAnaliseMedidor variables={variables} meters={meters}/>;
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