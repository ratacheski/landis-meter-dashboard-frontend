import { Button, Grid, Input } from "@nextui-org/react";
import React from "react";
import { Flex } from "../styles/flex";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { getBaseUrl } from "../../shared/utils/apiUtil";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Variable } from "../../shared/utils/types";

type VariaveisProps = {
  variable: Variable;
};

type FormItems = {
  property: "code" | "name" | "acronym" | "unit";
  errorMessage?: string;
  label: string;
  placeholder: string;
  cols?: number;
  required: boolean;
  readOnly?: boolean;
};
export const FormVariable = ({ variable }: VariaveisProps) => {
  const formItems: FormItems[] = [
    {
      property: "code",
      readOnly: !!variable.code,
      errorMessage: "Código é obrigatório",
      label: "Código",
      placeholder: "Código da Variável",
      cols: 6,
      required: true,
    },
    {
      property: "name",
      label: "Nome",
      placeholder: "Nome",
      cols: 6,
      errorMessage: "Nome é obrigatório",
      required: true,
    },
    {
      property: "acronym",
      label: "Sigla",
      placeholder: "Sigla",
      cols: 6,
      errorMessage: "Sigla é obrigatória",
      required: true,
    },
    {
      property: "unit",
      label: "Unidade",
      placeholder: "Unidade de Medida",
      cols: 6,
      errorMessage: "Unidade de Medida é obrigatória",
      required: true,
    },
  ];
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Variable>({
    defaultValues: {
      ...variable,
    },
  });

  const onSubmit = handleSubmit(async (data: Variable) => {
    const url = `${getBaseUrl()}/variable${
      variable.id ? `/${variable.id}` : ""
    }`;
    const method = variable.id ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("Variável registrada com sucesso");
      router.push("/variaveis");
    } else {
      const res = await response.json();
      toast.error(res.message);
    }
  });

  const router = useRouter();

  function voltar(): void {
    router.push("/variaveis");
  }

  return (
    <form onSubmit={onSubmit}>
      <Flex css={{ gap: "$8" }} align={"center"} justify={"end"} wrap={"wrap"}>
        <Flex direction={"row"} css={{ gap: "$6" }} wrap={"wrap"}>
          <Button auto color={"secondary"} onPress={voltar}>
            Voltar
          </Button>
          <Button auto type="submit">
            Salvar
          </Button>
        </Flex>
      </Flex>
      <Grid.Container gap={2} justify="center">
        {formItems.map(
          (
            {
              cols,
              label,
              property,
              required,
              errorMessage,
              placeholder,
              readOnly,
            },
            index
          ) => {
            return (
              <Grid key={`form-item-${index}`} xs={cols}>
                <Input
                  label={errors[property]?.message || label}
                  bordered
                  readOnly={readOnly}
                  clearable
                  fullWidth
                  color={errors[property]?.message ? "error" : "default"}
                  size="lg"
                  {...register(property, {
                    required: required ? errorMessage : false,
                  })}
                  placeholder={placeholder}
                />
              </Grid>
            );
          }
        )}
      </Grid.Container>
    </form>
  );
};
