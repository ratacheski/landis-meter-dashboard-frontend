import { MeterForm } from "../../components/MeterForm/index"
import {getBaseUrl} from "../../shared/utils/apiUtil";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

const NovoMedidorPage = () => {
  return (
    <div>
      <h1>Novo Medidor</h1>
      <MeterForm />
    </div>
  );
};

export default NovoMedidorPage;

