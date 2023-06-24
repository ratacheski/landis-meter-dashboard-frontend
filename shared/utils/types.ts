export type Variable = {
  id?: string;
  code?: string;
  name?: string;
  acronym?: string;
  unit?: string;
};

export type Meter = {
  id?: string;
  name?: string;
  acronym?: string;
  latitude?: string;
  longitude?: string;
};

export type Measurements = {
  meterId?: string;
  meterName?: string;
  variableId?: string;
  variableName?: string;
  variableAcronym?: string;
  variableUnit?: string;
  measurements?: MeasurementeTuple[];
};

export type MeasurementeTuple = {
  id: string;
  instant: number;
  value: string;
};