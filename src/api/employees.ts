import { DEPARTMENTS } from "../constants";
import { API_URLS } from "../routes"
import { api } from "../lib/api"

export type DepartmentValue = typeof DEPARTMENTS[number];

export type EmployeesData = {
  employees: {
    id: string;
    name: string;
    position: string;
    department: DepartmentValue;
  }[]
};

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

export type EmployeesSortBy = 'none' | 'asc' | 'desc';
export type DepartmentFilter = DepartmentValue | 'All';

export const fetchEmployees = (search: string, department: DepartmentFilter, sortBy: EmployeesSortBy) => {
  return api.get<EmployeesData>(API_URLS.EMPLOYEES_INDEX(search, department, sortBy));
}

export const fetchEmployeeDetails = (id: string) => {
  return api.get<EmployeeDetails>(API_URLS.EMPLOYEES_DETAILS(id));
}

export const deleteEmployee = (id: string) => {
  return api.delete<{}>(API_URLS.EMPLOYEES_DETAILS(id), {});
}