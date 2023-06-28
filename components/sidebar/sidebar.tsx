import React from "react";
import { Box } from "@/components/styles/box";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { Flex } from "@/components/styles/flex";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "@/components/icons/sidebar/home-icon";
import { PaymentsIcon } from "@/components/icons/sidebar/payments-icon";
import { BalanceIcon } from "@/components/icons/sidebar/balance-icon";
import { AccountsIcon } from "@/components/icons/sidebar/accounts-icon";
import { CustomersIcon } from "@/components/icons/sidebar/customers-icon";
import { ProductsIcon } from "@/components/icons/sidebar/products-icon";
import { ReportsIcon } from "@/components/icons/sidebar/reports-icon";
import { DevIcon } from "@/components/icons/sidebar/dev-icon";
import { ViewIcon } from "@/components/icons/sidebar/view-icon";
import { SettingsIcon } from "@/components/icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "@/components/icons/sidebar/filter-icon";
import { useSidebarContext } from "@/components/layout/layout-context";
import { ChangeLogIcon } from "@/components/icons/sidebar/changelog-icon";
import { useRouter } from "next/router";
import { TimeSquare } from "react-iconly";

export const SidebarWrapper = () => {
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <Box
      as="aside"
      css={{
        height: "100vh",
        zIndex: 202,
        position: "sticky",
        top: "0",
      }}
    >
      {collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}

      <Sidebar collapsed={collapsed}>
        <Sidebar.Header>
          <CompaniesDropdown />
        </Sidebar.Header>
        <Flex direction={"column"} justify={"between"} css={{ height: "100%" }}>
          <Sidebar.Body className="body sidebar">
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={router.pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Dashboards">
              <SidebarItem
                isActive={router.pathname === "/dashboards/analise-medidor"}
                title="Análise de Medidor"
                icon={<BalanceIcon />}
                href="/dashboards/analise-medidor"
              />
            </SidebarMenu>
            <SidebarMenu title="Cadastro">
              <SidebarItem
                isActive={router.pathname === "/variaveis"}
                title="Variáveis"
                icon={<PaymentsIcon />}
                href="/variaveis"
              />
              <SidebarItem
                isActive={router.pathname === "/medidores"}
                title="Medidores"
                icon={<TimeSquare primaryColor="#969696" />}
                href="/medidores"
              />

              <SidebarItem
                isActive={router.pathname === "/customers"}
                title="Clientes"
                icon={<CustomersIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="Configurações">
              <SidebarItem
                isActive={router.pathname === "/reports"}
                title="Relatórios"
                icon={<ReportsIcon />}
              />
              <SidebarItem
                isActive={router.pathname === "/developers"}
                title="Consultas"
                icon={<DevIcon />}
              />
              <SidebarItem
                isActive={router.pathname === "/settings"}
                title="Configurações"
                icon={<SettingsIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={router.pathname === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu>
          </Sidebar.Body>
          <Sidebar.Footer>
            <Tooltip content={"Settings"} rounded color="primary">
              <SettingsIcon />
            </Tooltip>
            <Tooltip content={"Adjustments"} rounded color="primary">
              <FilterIcon />
            </Tooltip>
            <Tooltip content={"Profile"} rounded color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size={"sm"}
              />
            </Tooltip>
          </Sidebar.Footer>
        </Flex>
      </Sidebar>
    </Box>
  );
};
