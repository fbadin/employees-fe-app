import * as React from 'react';
import { EmployeesData } from '../api/employees';

type Context = {
	backBtnUrl: string;
	setBackBtnUrl: (url: string) => void;
	employees: EmployeesData | undefined;
	setEmployees: (employees: EmployeesData) => void;
}

const AppContext = React.createContext<undefined | Context>(undefined);

export { AppContext };