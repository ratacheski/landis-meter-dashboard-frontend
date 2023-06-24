import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Medidores } from '../../components/medidores'
import {getBaseUrl} from "../../shared/utils/apiUtil";
import { Meter } from "../../shared/utils/types";

export default function medidores({
  meters,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <Medidores meters={meters}/>
  );
}

export const getServerSideProps: GetServerSideProps<{
  meters: Meter[];
}> = async () => {
  const res = await fetch(`${getBaseUrl()}/meter`);
  const meters = await res.json();
  return { props: { meters } };
};
