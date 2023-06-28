import { Button, Grid, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { Flex } from '@/components/styles/flex';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { getBaseUrl } from '@/shared/utils/apiUtil';
import { ToastContainer, toast } from 'react-toastify';
import { Meter } from "@/shared/utils/types";
import 'react-toastify/dist/ReactToastify.css';

type MedidoresProps = {
  meter: Meter;
};


type FormItems = {
  property: 'name' | 'acronym' | 'latitude' | 'longitude';
  errorMessage?: string;
  label: string;
  placeholder: string;
  cols?: number;
  required: boolean;
  readOnly?: boolean;
};

export const FormMeter = ({ meter }: MedidoresProps) => {
  const formItems: FormItems[] = [
        {
            property: "name",
            // readOnly: !!meter.name,
            errorMessage: 'Nome é obrigatório',
            label: "Nome",
            placeholder: "Nome",
            cols: 6,
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
            property: "latitude",
            label: "Latitude",
            placeholder: "Latitude",
            cols: 6,
            errorMessage: 'Latitude é obrigatória',
            required: true
        },
        {
            property: "longitude",
            label: "Longitude",
            placeholder: "Longitude",
            cols: 6,
            errorMessage: 'Longitude é obrigatória',
            required: true
        }
    ]
    const {handleSubmit, register, formState: {errors}} = useForm<Meter>({
        defaultValues: {
            ...meter
        }
  });

const onSubmit = handleSubmit(async (data: Meter) => {
        const url = `${getBaseUrl()}/meter${
            meter.id ? `/${meter.id}` : ""
        }`;
        const method = meter.id ? "PUT" : "POST";
//    fetch(url, {
//      method: method,
//      headers: {
//        'Accept': 'application/json',
//        'Content-Type': 'application/json;charset=UTF-8'
//      },
//      body: JSON.stringify(data)
//    })
//      .then((response) => {
//        if (response.ok) {
//            toast.success('Medidor registrado com sucesso');
//        } else {
//            toast.error('Ocorreu um erro ao salvar Medidor');
//        }
//      })
//      .catch(() => {
//        toast.error('Ocorreu um erro ao salvar Medidor');
//      })
//      .finally(() => {
//        router.push('/medidores/');
//      });
//  });
//
const response = await fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    toast.success("Medidor registrado com sucesso");
    router.push("/medidores");
  } else {
    toast.error('Ocorreu um erro ao salvar Medidor');
    const res = await response.json();
    toast.error(res.message);
  }
});
  const router = useRouter();

  function voltar(): void {
    router.push('/medidores');
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
