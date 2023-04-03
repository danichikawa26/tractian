import { IWorkOrder } from "../interfaces/workOrder";
import { api } from "./api";

export const getWorkOrders = async (): Promise<IWorkOrder[]> => {
  const response = await api.get("/workorders").catch(err => {
    throw err;
  });
  return response.data;
};

export const getWorkOrderById = async (id: number): Promise<IWorkOrder> => {
  const response = await api.get(`/workorders/${id}`).catch(err => {
    throw err;
  });
  return response.data;
};
