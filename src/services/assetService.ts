import { IAsset } from "../interfaces/asset";
import { api } from "./api";

export const getAssets = async (): Promise<IAsset[]> => {
  const response = await api.get("/assets").catch(err => {
    throw err;
  });
  return response.data;
};

export const getAssetById = async (id: number): Promise<IAsset> => {
  const response = await api.get(`/assets/${id}`).catch(err => {
    throw err;
  });
  return response.data;
};
