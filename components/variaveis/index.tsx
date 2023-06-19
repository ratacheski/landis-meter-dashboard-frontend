import { Button, Modal, Text } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { Breadcrumbs, Crumb, CrumbLink } from "../breadcrumb/breadcrumb.styled";
import { ExportIcon } from "../icons/accounts/export-icon";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { Flex } from "../styles/flex";
import { TableAction, TableColumn } from "../table/data-table.interface";
import { useRouter } from "next/router";
import { DataTable } from "../table/data-table";
import { getBaseUrl } from "../../shared/utils/apiUtil";
import { toast } from "react-toastify";

type VariaveisProps = {
  variables: Variable[];
};
type Variable = {
  id?: string;
  code?: string;
  name?: string;
  acronym?: string;
  unit?: string;
};

export const Variaveis = ({ variables }: VariaveisProps) => {
  const router = useRouter();

  const [deleteVisible, setDeleteVisible] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<Variable>({});
  const columns: TableColumn[] = [
    { name: "Código", uid: "code" },
    { name: "Nome", uid: "name" },
    { name: "Sigla", uid: "acronym" },
    { name: "Unidade", uid: "unit" },
    { name: "Actions", uid: "actions", hideHeader: true },
  ];

  const actions: TableAction[] = [
    // Duas outras opções já estão implementadas para as actions e estão comentadas abaixo
    // {name: "Exemplo Botão", onClick: (item) => editar(item), color: "primary"},
    // {icon: "detail", onClick: (item) => editar(item)},
    { icon: "edit", onClick: (item) => editar(item) },
    { icon: "delete", onClick: (item) => showDelete(item) },
  ];

  function editar(item: any): void {
    router.push("/variaveis/" + item.id);
  }

  function novo(): void {
    router.push("/variaveis/novo");
  }

  function showDelete(item: any): void {
    setItemToDelete(item);
    setDeleteVisible(true);
  }

  const closeDeleteHandler = (confirm: boolean) => {
    if (confirm) {
      const url = `${getBaseUrl()}/variable/${itemToDelete.id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then(async (response) => {
          if (response.ok) {
            toast.success("Variável removida com sucesso");
            router.push("/variaveis");
          } else {
            const res = await response.json();
            toast.error(res.message);
          }
        })
        .finally(() => {
          router.push("/variaveis");
        });
    }
    setItemToDelete({});
    setDeleteVisible(false);
  };

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
          <HouseIcon />
          <Link href={"/"}>
            <CrumbLink href="#">Home</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>

        <Crumb>
          <PaymentsIcon />
          <CrumbLink href="#">Variáveis</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <Text h3>Variáveis</Text>
      <Flex css={{ gap: "$8" }} align={"center"} justify={"end"} wrap={"wrap"}>
        <Flex direction={"row"} css={{ gap: "$6" }} wrap={"wrap"}>
          <Button auto iconRight={<ExportIcon />} color={"secondary"}>
            Exportar
          </Button>
          <Button auto onClick={novo}>
            Nova Variável +
          </Button>
        </Flex>
      </Flex>
      <Modal
        aria-labelledby="modal-title"
        open={deleteVisible}
        onClose={() => setDeleteVisible(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Atenção
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>Deseja realmente excluir a variável {itemToDelete.name}?</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="error"
            onPress={() => closeDeleteHandler(false)}
          >
            Não
          </Button>
          <Button auto onPress={() => closeDeleteHandler(true)}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
      <DataTable
        ariaLabel="Tabela de Variáveis"
        columns={columns}
        data={variables}
        actions={actions}
      />
    </Flex>
  );
};
