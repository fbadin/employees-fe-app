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
  salary: number;
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

export type EmployeeCreateParams = {
  name: string;
  email: string;
  position: string;
  department: DepartmentValue;
  salary: number;
  start_date: string;
}

export const createEmployee = (createParams: EmployeeCreateParams) => {
  const params = {
    body: {
      ...createParams
    }
  }
  return api.post<EmployeeDetails>(API_URLS.CREATE_EMPLOYEE, params);
}

export const updateEmployee = (id: string, updateParams: EmployeeCreateParams) => {
  const params = {
    body: {
      ...updateParams
    }
  }
  return api.put<EmployeeDetails>(API_URLS.UPDATE_EMPLOYEE(id), params);
}

export const deleteEmployee = (id: string) => {
  return api.delete<{}>(API_URLS.DELETE_EMPLOYEE(id), {});
}