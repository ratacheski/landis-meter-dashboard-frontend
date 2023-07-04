import { Button, Grid, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Flex } from "@/components/styles/flex";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { getBaseUrl } from "@/shared/utils/apiUtil";
import { ToastContainer, toast } from "react-toastify";
import { Meter } from "@/shared/utils/types";
import "react-toastify/dist/ReactToastify.css";
import MapComponent from "./map-component";

type MedidoresProps = {
  meter: Meter;
};

type FormItems = {
  property: "id" | "name" | "acronym" | "latitude" | "longitude";
  errorMessage?: string;
  label: string;
  placeholder: string;
  cols?: number;
  required: boolean;
  readOnly?: boolean;
};

export const FormMeter = ({ meter }: MedidoresProps) => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setUserLocation({ latitude, longitude });
      });
    }
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm<Meter>({
    defaultValues: {
      ...meter,
    },
  });

  useEffect(() => {
    // Fetch data from API if `location` object is set
    if (userLocation && !meter.id) {
      meter.latitude = userLocation.latitude;
      meter.longitude = userLocation.longitude;
      reset(meter);
    }
  }, [meter, reset, userLocation]);
  
  const formItems: FormItems[] = [
    {
      property: "name",
      errorMessage: "Nome é obrigatório",
      label: "Nome",
      placeholder: "Nome",
      cols: 6,
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
      property: "latitude",
      label: "Latitude",
      placeholder: "Latitude",
      cols: 6,
      errorMessage: "Latitude é obrigatória",
      required: true,
    },
    {
      property: "longitude",
      label: "Longitude",
      placeholder: "Longitude",
      cols: 6,
      errorMessage: "Longitude é obrigatória",
      required: true,
    },
  ];


  const onSubmit = handleSubmit(async (data: Meter) => {
    const url = `${getBaseUrl()}/meter${meter.id ? `/${meter.id}` : ""}`;
    const method = meter.id ? "PUT" : "POST";
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const res = await response.json();
      const { token } = res;
      toast.success("Medidor registrado com sucesso");
      router.push("/medidores");
      if (method === "POST") {
        navigator.clipboard
          .writeText(token)
          .then(() => {
            toast.success("Token copiado para área de Transferência");
          })
          .catch((error) => {
            console.error("Falha ao copiar token:", error);
          });
      }
    } else {
      toast.error("Ocorreu um erro ao salvar Medidor");
      const res = await response.json();
      toast.error(res.message);
    }
  });

  const dragHandler = (e: google.maps.MapMouseEvent) => {
    setValue("latitude", e?.latLng?.lat());
    setValue("longitude", e?.latLng?.lng());
  };
  const router = useRouter();

  function voltar(): void {
    router.push("/medidores");
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
      <MapComponent meter={getValues()} onDragHandler={dragHandler}/>
    </form>
  );
};
