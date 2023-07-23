import { MedidorEdicao } from "@/components/medidores/medidor-edicao";
import { getBaseUrl } from "@/shared/utils/apiUtil";
import { Meter, Variable } from "@/shared/utils/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function medidorForm({
  meter,
  variables,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <MedidorEdicao meter={meter} variables={variables} />;
}

export const getServerSideProps: GetServerSideProps<{
  meter: Meter;
  variables: Variable[];
}> = async (context) => {
  let meter: Meter = {};
  const res = await fetch(`${getBaseUrl()}/variable`);
  const variables = await res.json();
  if (context.params?.id !== "novo") {
    const res = await fetch(`${getBaseUrl()}/meter/${context.params?.id}`);
    meter = await res.json();
  }

  return { props: { meter, variables } };
};
