import { UnknownAction } from "@reduxjs/toolkit";
import { EmployeesData } from "../../api/employees";

export const ACTIONS = {
  SET_USERS: "SET_USERS"
} as const;

export type ACTION_TYPES = keyof typeof ACTIONS;

export type SetUsersAction = {
  type: typeof ACTIONS.SET_USERS;
  payload: EmployeesData;
} & UnknownAction;

export type EmployeeActions = SetUsersAction;

export const setUsers = (employees: EmployeesData): SetUsersAction => ({
  type: ACTIONS.SET_USERS,
  payload: employees
});
