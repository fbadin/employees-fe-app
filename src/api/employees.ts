import { API_URLS } from "../routes"
import { api } from "./lib"

export type EmployeesData = {
  employees: {
    id: string;
    name: string;
  }[]
}

export type EmployeeDetails = {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  salary: string;
  start_date: Date;
  created_at: Date;
  updated_at: Date;
}

export const fetchEmployees = () => {
  return api.get<EmployeesData>(API_URLS.EMPLOYEES_INDEX);
}

export const fetchEmployeeDetails = (id: string) => {
  return api.get<EmployeeDetails>(API_URLS.EMPLOYEES_DETAILS(id));
}

export const deleteEmployee = (id: string) => {
  return api.delete<{}>(API_URLS.EMPLOYEES_DETAILS(id), {});
}