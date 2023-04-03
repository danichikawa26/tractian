import { IUnit } from "../interfaces/unit";
import { api } from "./api";

export const getUnits = async (): Promise<IUnit[]> => {
  const response = await api.get("/units").catch(err => {
    throw err;
  });
  return response.data;
};

export const getUnitById = async (id: number): Promise<IUnit> => {
  const response = await api.get(`/units/${id}`).catch(err => {
    throw err;
  });
  return response.data;
};
