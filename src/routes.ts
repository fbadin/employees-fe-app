const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_V1 = `${BASE_URL}/api/v1`;

export const URLS = Object.freeze({
	DASHBOARD: `/dashboard/`,
	EMPLOYEE_DETAILS: (id: string) => `/employees/${id}`,
});

export const API_URLS = Object.freeze({
	EMPLOYEES_INDEX: `${API_V1}/employees/`,
	EMPLOYEES_DETAILS: (id: string) => `${API_V1}/employees/${id}/`,
});