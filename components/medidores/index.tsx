import { Button, Modal, Text } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { Breadcrumbs, Crumb, CrumbLink } from "@/components/breadcrumb/breadcrumb.styled";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { PaymentsIcon } from "@/components/icons/sidebar/payments-icon";
import { Flex } from "@/components/styles/flex";
import { TableAction, TableColumn } from "@/components/table/data-table.interface";
import { useRouter } from "next/router";
import { DataTable } from "@/components/table/data-table";
import { getBaseUrl } from "@/shared/utils/apiUtil";
import MapModal from "./map-modal";
import { Meter } from "@/shared/utils/types";
import { toast } from "react-toastify";

type MedidoresProps = {
  meters: Meter[];
};

export const Medidores = ({ meters }: MedidoresProps) => {
  const router = useRouter();
  const [mapVisible, setMapVisible] = React.useState(false);
  const [itemToShowMap, setItemToShowMap] = React.useState<Meter>({});
  const closeMapModalHandler = (save = false) => {
    setMapVisible(false);
    if (save) {
      const url = `${getBaseUrl()}/meter/${itemToShowMap.id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemToShowMap),
      }).then(() => {
        toast.success("Coordenadas do Medidor atualizadas com sucesso!");
      });
    }
  };

  const [deleteVisible, setDeleteVisible] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<Meter>({});
  const columns: TableColumn[] = [
    { name: "Nome", uid: "name" },
    { name: "Sigla", uid: "acronym" },
    { name: "Actions", uid: "actions", hideHeader: true },
  ];

  const actions: TableAction[] = [
    {icon: "location", onClick: (item) => verLocalizacao(item)},
    { icon: "edit", onClick: (item) => editar(item) },
    { icon: "delete", onClick: (item) => showDelete(item) },
  ];

  function editar(item: any): void {
    router.push("/medidores/" + item.id);
  }

  function verLocalizacao(item: any): void {
    setItemToShowMap(item);
    setMapVisible(true);
  }

  function novo(): void {
    router.push("/medidores/novo");
  }

  function showDelete(item: any): void {
    setItemToDelete(item);
    setDeleteVisible(true);
  }

  const closeDeleteHandler = (confirm: boolean) => {
    if (confirm) {
      const url = `${getBaseUrl()}/meter/${itemToDelete.id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then(async (response) => {
          if (response.ok) {
            toast.success("Medidor removido com sucesso");
            router.push("/medidores");
          } else {
            const res = await response.json();
            toast.error(res.message);
          }
        })
        .finally(() => {
          router.push("/medidores");
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
          <CrumbLink href="#">Medidores</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <Text h3>Medidores</Text>
      <Flex css={{ gap: "$8" }} align={"center"} justify={"end"} wrap={"wrap"}>
        <Flex direction={"row"} css={{ gap: "$6" }} wrap={"wrap"}>
          <Button auto iconRight={<ExportIcon />} color={"secondary"}>
            Exportar
          </Button>
          <Button auto onClick={novo}>
            Novo Medidor +
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
          <Text>Deseja realmente excluir o medidor {itemToDelete.name}?</Text>
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
        ariaLabel="Tabela de Medidores"
        columns={columns}
        data={meters}
        actions={actions}
      />
      <MapModal visible={mapVisible} closeHandler={closeMapModalHandler} meter={itemToShowMap}/>
    </Flex>
  );
};
