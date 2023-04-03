export interface IUser {
  id: number;
  email: string;
  name: string;
  unitId: number;
  companyId: number;
  type: "user" | "admin";
}
