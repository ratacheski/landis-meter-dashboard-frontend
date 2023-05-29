import { NormalColors } from "@nextui-org/react";
import {ColumnStaticSize} from "@react-types/table";

export interface TableAction {
  name?: string;
  icon?: string;
  color?: NormalColors|string;
  tooltip?: string;
  onClick: (item: any) => void;
}

export interface TableColumn {
  uid: string;
  name: string;
  align?: "start" | "center" | "end";
  hideHeader?: boolean;
  width?: ColumnStaticSize;
}
