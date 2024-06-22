import { UnknownAction } from 'redux';
import { EmployeesData } from '../../api/employees';
import { ACTIONS, ACTION_TYPES } from './actions';

export const initialState: EmployeesData = {
  employees: []
};

type REDUCER_ACTIONS = { type: ACTION_TYPES, payload: any };

export function employeesReducer(state: EmployeesData = initialState, action: UnknownAction | REDUCER_ACTIONS): EmployeesData {
  switch (action.type) {
    case ACTIONS.SET_USERS:
      return {
        ...state,
        employees: action.payload.employees
      };
    default:
      return state;
  }
}

export default employeesReducer;
