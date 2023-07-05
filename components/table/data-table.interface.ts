import { NormalColors } from "@nextui-org/react";
import {ColumnStaticSize} from "@react-types/table";

export interface TableAction {
  name?: string;
  icon?: string;
  color?: NormalColors|string;
  tooltip?: ((item: any) => string) | string;
  onClick: (item: any) => void;
  disabled?: (item: any) => boolean;
}

export interface TableColumn {
  uid: string;
  name: string;
  align?: "start" | "center" | "end";
  hideHeader?: boolean;
  width?: ColumnStaticSize;
}
