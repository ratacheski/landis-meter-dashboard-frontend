import {Button, Grid, Input} from '@nextui-org/react';
import React from 'react';
import {Flex} from '../styles/flex';
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {getBaseUrl} from "../../shared/utils/apiUtil";

type VariaveisProps = {
    variable: Variable;
};
type Variable = {
    id?: string;
    name?: string;
    acronym?: string;
    unit?: string;
};

type FormItems = {
    property: "id" | "name" | "acronym" | "unit";
    errorMessage?: string;
    label: string;
    placeholder: string;
    cols?: number;
    required: boolean;
    readOnly?: boolean;
}
export const FormVariable = ({variable}: VariaveisProps) => {

    const formItems: FormItems[] = [
        {
            property: "id",
            readOnly: !!variable.id,
            errorMessage: 'ID é obrigatório',
            label: "ID",
            placeholder: "Identificador",
            cols: 6,
            required: true
        },
        {
            property: "name",
            label: "Nome",
            placeholder: "Nome",
            cols: 6,
            errorMessage: 'Nome é obrigatório',
            required: true
        },
        {
            property: "acronym",
            label: "Sigla",
            placeholder: "Sigla",
            cols: 6,
            errorMessage: 'Sigla é obrigatória',
            required: true
        },
        {
            property: "unit",
            label: "Unidade",
            placeholder: "Unidade de Medida",
            cols: 6,
            errorMessage: 'Unidade de Medida é obrigatória',
            required: true
        }
    ]
    const {handleSubmit, register, formState: {errors}} = useForm<Variable>({
        defaultValues: {
            ...variable
        }
    });

    const onSubmit = handleSubmit((data: Variable) => {
        const url = `${getBaseUrl()}/variable${variable.id ? `/${variable.id}` : ''}`;
        const method = variable.id ? 'PUT' : 'POST'

        fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(data)
        }).then(() => {
            //TO-DO: Implementar uso de snackbar para exibir mensagem de erro ou sucesso
            router.push("/variaveis")
        })
    });

    const router = useRouter();

    function voltar(): void {
        router.push("/variaveis");
    }


    return (
        <form onSubmit={onSubmit}>
            <Flex
                css={{gap: "$8"}}
                align={"center"}
                justify={"end"}
                wrap={"wrap"}
            >
                <Flex direction={"row"} css={{gap: "$6"}} wrap={"wrap"}>
                    <Button auto color={"secondary"} onPress={voltar}>
                        Voltar
                    </Button>
                    <Button auto type="submit">
                        Salvar
                    </Button>
                </Flex>
            </Flex>
            <Grid.Container gap={2} justify="center">
                {formItems.map(({
                                    cols,
                                    label,
                                    property,
                                    required,
                                    errorMessage,
                                    placeholder,
                                    readOnly
                                }, index) => {
                    return (
                        <Grid key={`form-item-${index}`} xs={cols}>
                            <Input
                                label={errors[property]?.message || label}
                                bordered
                                readOnly={readOnly}
                                clearable
                                fullWidth
                                color={errors[property]?.message ? 'error' : 'default'}
                                size="lg"
                                {...register(property, {required: required ? errorMessage : false})}
                                placeholder={placeholder}
                            />
                        </Grid>
                    )
                })}
            </Grid.Container>
        </form>
    );
};
