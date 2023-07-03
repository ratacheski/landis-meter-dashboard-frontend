import { Table } from "@nextui-org/react";
import React from "react";
import { Box } from "@/components/styles/box";
import { RenderCell } from "./render-cell";
import { TableAction, TableColumn } from "./data-table.interface";

type DataTableProps = {
  ariaLabel: string;
  columns: TableColumn[];
  selectionMode?: "single" | "multiple" | "none";
  data: any[];
  actions?: TableAction[];
  pageSize?: number;
  showPagination?: boolean;
};

export const DataTable = ({
  ariaLabel,
  columns,
  selectionMode,
  data,
  actions,
  pageSize,
  showPagination = true
}: DataTableProps) => {
  return (
    <Box
      css={{
        "& .nextui-table-container": {
          boxShadow: "none",
        },
      }}
    >
      <Table
        aria-label={ariaLabel}
        css={{
          height: "auto",
          minWidth: "100%",
          boxShadow: "none",
          width: "100%",
          px: 0,
        }}
        selectionMode={selectionMode || "single"}
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.hideHeader}
              align={column.align || "start"}
              width={
                column.uid === "actions" ? column.width || "10%" : column.width
              }
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={data}>
          {(item) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>
                  {RenderCell({
                    item,
                    columnKey: columnKey,
                    actions: actions,
                  })}
                </Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
        {showPagination && <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={pageSize || 10}
        />}        
      </Table>
    </Box>
  );
};
