export type Variable = {
  id: string;
  code: string;
  name: string;
  acronym: string;
  unit: string;
};

export type Meter = {
  showInfoWindow: boolean;
  id?: string;
  name?: string;
  acronym?: string;
  latitude: number;
  longitude: number;
  active?: boolean;
  lastSincronization?: Date;
  variables: Variable[];
};

export type Measurements = {
  meterId: string;
  meterName: string;
  variableId: string;
  variableName: string;
  variableAcronym: string;
  variableUnit: string;
  measurements: MeasurementeTuple[];
  statistics: Statistics;
};

export type Statistics = {
  min: number;
  max: number;
  avg: number;
  std: number;
  median: number;
  mode: number;
  normalDistribution: NormalDistribution[];
};

export type NormalDistribution = {
  x: number;
  y: number;
};

export type MeasurementeTuple = {
  id: string;
  instant: number;
  value: string;
};

export type StatisticalMeasurement = {
  name: string;
  unit: string;
  avg: number;
  max: number;
  median: number;
  min: number;
  mode: number;
  std: number;
};