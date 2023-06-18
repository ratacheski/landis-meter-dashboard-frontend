import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Medidores } from '../../components/medidores'
import {getBaseUrl} from "../../shared/utils/apiUtil";

type Meter = {
  id: string;
  name: string;
  acronym: string;
  latitude: string;
  longitude: string;
};

export default function meters({
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
