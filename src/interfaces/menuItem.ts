import { MenuProps } from "antd";
import { IAsset } from "./asset";
import { ICompany } from "./company";
import { IUnit } from "./unit";
import { IUser } from "./user";
import { IWorkOrder } from "./workOrder";

export interface IItem {
  key: string;
  label: string;
  icon: JSX.Element;
  children: {
    key: string;
    label: string;
    to: string;
    Component?: () => JSX.Element;
    service?: {
      getAll: () => Promise<
        IWorkOrder[] | IUser[] | IUnit[] | IAsset[] | ICompany[]
      >;
      getById: (
        id: number
      ) => Promise<IWorkOrder | IUser | IUnit | IAsset | ICompany>;
    };
  }[];
}
export type MenuItem = Required<MenuProps>["items"][number];
