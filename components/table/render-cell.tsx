import { Button, Col, NextUITheme, NextUIThemeContext, Row, Tooltip, useTheme } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { EyeIcon } from "@/components/icons/table/eye-icon";
import { TableAction } from "./data-table.interface";
import { IconButton } from "./table.styled";
import { Location } from "react-iconly";
import { ExportIcon } from "../icons/accounts/export-icon";

interface Props {
  item: any;
  columnKey: string | React.Key;
  actions?: TableAction[];
}

const renderButton = (action: TableAction, item: any, theme: NextUITheme) => {

  switch (action.icon) {
    case "delete":
      return (
        <IconButton
          onClick={() => action.onClick(item)}
          disabled={action.disabled ? action.disabled(item) : false}
        >
          <DeleteIcon
            size={25}
            fill={
              action.disabled
                ? action.disabled(item)
                  ? "#979797"
                  :  action.color || theme.colors.error.value
                : action.color || theme.colors.error.value
            }
          />
        </IconButton>
      );
    case "edit":
      return (
        <IconButton
          onClick={() => action.onClick(item)}
          disabled={action.disabled ? action.disabled(item) : false}
        >
          <EditIcon size={25} 
            fill={
              action.disabled
                ? action.disabled(item)
                  ? "#979797"
                  :  action.color || theme.colors.primary.value
                : action.color || theme.colors.primary.value
            } />
        </IconButton>
      );
    case "detail":
      return (
        <IconButton
          onClick={() => action.onClick(item)}
          disabled={action.disabled ? action.disabled(item) : false}
        >
          <EyeIcon size={25} 
            fill={
              action.disabled
                ? action.disabled(item)
                  ? "#979797"
                  :  action.color || theme.colors.primary.value
                : action.color || theme.colors.primary.value
            } />
        </IconButton>
      );
    case "location":
      return (
        <IconButton
          onClick={() => action.onClick(item)}
          disabled={action.disabled ? action.disabled(item) : false}
        >
          <Location set="bold" primaryColor="blueviolet" />
        </IconButton>
      );
    case "export":
      return (
        <IconButton
          onClick={() => action.onClick(item)}
          disabled={action.disabled ? action.disabled(item) : false}
        >
          <ExportIcon size={25} 
            fill={
              action.disabled
                ? action.disabled(item)
                  ? "#979797"
                  :  action.color || theme.colors.secondary.value
                : action.color || theme.colors.secondary.value
            } />
        </IconButton>
      );
    default:
      return (
        <Button // @ts-ignore
          color={action.color || "primary"}
          auto
          onPress={() => action.onClick(item)}
          disabled={action.disabled ? action.disabled(item) : false}
        >
          {action.name}
        </Button>
      );
  }
};

export const RenderCell = ({ item, columnKey, actions }: Props) => {

  const { theme } = useTheme();
  // @ts-ignore
  const cellValue = item[columnKey];
  switch (columnKey) {
    case "actions":
      return (
        <Row
          justify="center"
          align="center"
          css={{ gap: "$8", "@md": { gap: 0 } }}
        >
          {actions.map((action) => {
            return (
              <Col css={{ d: "flex" }} key={action.name}>
                <Tooltip
                  content={
                    typeof action.tooltip === "function"
                      ? action.tooltip(item)
                      : action.tooltip
                  }
                >
                  {renderButton(action, item, theme)}
                </Tooltip>
              </Col>
            );
          })}
        </Row>
      );
    default:
      return cellValue;
  }
};
