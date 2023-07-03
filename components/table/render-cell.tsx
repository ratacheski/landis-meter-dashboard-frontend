import {Button, Col, Row, Tooltip} from "@nextui-org/react";
import React from "react";
import {DeleteIcon} from "@/components/icons/table/delete-icon";
import {EditIcon} from "@/components/icons/table/edit-icon";
import {EyeIcon} from "@/components/icons/table/eye-icon";
import {TableAction} from "./data-table.interface";
import {IconButton} from "./table.styled";
import {Location} from "react-iconly"

interface Props {
    item: any;
    columnKey: string | React.Key;
    actions?: TableAction[];
}

const renderButton = (action: TableAction, item: any) => {
    switch (action.icon) {
        case "delete":
            return (
                <IconButton onClick={() => action.onClick(item)}>
                    <DeleteIcon size={25} fill={action.color || "#FF0080"}/>
                </IconButton>
            );
        case "edit":
            return (
                <IconButton onClick={() => action.onClick(item)}>
                    <EditIcon size={25} fill={action.color || "#979797"}/>
                </IconButton>
            );
        case "detail":
            return (
                <IconButton onClick={() => action.onClick(item)}>
                    <EyeIcon size={25} fill={action.color || "#979797"}/>
                </IconButton>
            );
        case "location":
            return (
                <IconButton onClick={() => action.onClick(item)}>
                    <Location set="bold" primaryColor="blueviolet"/>
                </IconButton>
            );
        default:
            return (
                <Button            // @ts-ignore
                    color={action.color || "primary"}
                    auto
                    onPress={() => action.onClick(item)}
                >
                    {action.name}
                </Button>
            );
    }
};

export const RenderCell = ({item, columnKey, actions}: Props) => {
    // @ts-ignore
    const cellValue = item[columnKey];
    switch (columnKey) {
        case "actions":
            return (
                <Row
                    justify="center"
                    align="center"
                    css={{gap: "$8", "@md": {gap: 0}}}
                >
                    {actions.map((action) => {
                        return (
                            <Col css={{d: "flex"}} key={action.name}>
                                <Tooltip content={action.tooltip}>
                                    {renderButton(action, item)}
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
