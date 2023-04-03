import { ICompany } from "../interfaces/company";
import { api } from "./api";

export const getCompanies = async (): Promise<ICompany[]> => {
  const response = await api.get("/companies").catch(err => {
    throw err;
  });
  return response.data;
};

export const getCompanyById = async (id: number): Promise<ICompany> => {
  const response = await api.get(`/companies/${id}`).catch(err => {
    throw err;
  });
  return response.data;
};
