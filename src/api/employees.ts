import { DEPARTMENTS } from "../constants";
import { API_URLS } from "../routes"
import { api } from "../lib/api"

export type EmployeesData = {
  employees: {
    id: string;
    name: string;
    department: string;
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

export type DepartmentValue = typeof DEPARTMENTS[number] | 'All';
export type EmployeesSortBy = 'none' | 'asc' | 'desc';

export const fetchEmployees = (search: string, department: DepartmentValue, sortBy: EmployeesSortBy) => {
  return api.get<EmployeesData>(API_URLS.EMPLOYEES_INDEX(search, department, sortBy));
}

export const fetchEmployeeDetails = (id: string) => {
  return api.get<EmployeeDetails>(API_URLS.EMPLOYEES_DETAILS(id));
}

export const deleteEmployee = (id: string) => {
  return api.delete<{}>(API_URLS.EMPLOYEES_DETAILS(id), {});
}