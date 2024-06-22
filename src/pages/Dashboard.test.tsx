import { render, screen, fireEvent } from '@testing-library/react';
import { AppContext } from '../contexts/appContext';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import { Dashboard } from './Dashboard';
import { URLS } from '../routes';
import { EmployeesData } from '../api/employees';
import * as ACTIONS from '../state/employees/actions';
import { store } from '../state/store';
import { ApiResponse } from '../lib/api';
import { fetchEmployees } from '../api/employees';

const employeesData: EmployeesData = {
  employees: [
    { id: '1', name: 'John Snow', position: 'Software Developer', department: 'Engineering' },
  ],
}

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock('../api/employees', ()=>({
  ...jest.requireActual('../api/employees'),
  fetchEmployees: jest.fn()
}))

jest.mock('../state/employees/actions', ()=>({
  ...jest.requireActual('../state/employees/actions'),
  setUsers: jest.fn()
}))

jest.useFakeTimers();

const mockSetBackBtnUrl = jest.fn();

const mockAppContextValue = {
  backBtnUrl: '/dashboard',
  setBackBtnUrl: mockSetBackBtnUrl,
};

const renderDashboard = async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <AppContext.Provider value={mockAppContextValue}>
          <BrowserRouter>
            <Dashboard />
          </BrowserRouter>
        </AppContext.Provider>
      </Provider>
    );
  });
};

describe('Dashboard', () => {
  let fetchEmployeesMock: jest.Mock<Promise<ApiResponse<EmployeesData>>>;

  beforeEach(() => {
    (ACTIONS.setUsers as jest.Mock).mockImplementation(()=>({ type: 'SET_USERS', payload: employeesData }))

    const fetchEmployeesLib = fetchEmployees as unknown as jest.Mock;
    fetchEmployeesMock = jest.fn().mockImplementation(()=>({ data: employeesData }));
    fetchEmployeesLib.mockImplementation(fetchEmployeesMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Dashboard component', async () => {
    await renderDashboard();
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
    expect(ACTIONS.setUsers).toHaveBeenCalledWith(employeesData);
  });

  it('sets the back button URL on mount', async () => {
    await renderDashboard();
    expect(mockSetBackBtnUrl).toHaveBeenCalledWith(URLS.DASHBOARD);
  });

  it('handles sorting button click', async () => {
    await renderDashboard();
    const sortButton = screen.getByTestId('sort-button');
    fireEvent.click(sortButton);
    await act(async () => {
      jest.advanceTimersByTime(500);
    });
    expect(fetchEmployeesMock).toHaveBeenCalledWith("", "All", "asc");
  });

  it('handles department filter selection', async () => {
    await renderDashboard();
    const dropdownToggle = screen.getByRole('button', { name: /filter by department/i });
    fireEvent.click(dropdownToggle);
    const engineeringOption = screen.getByRole('button', { name: 'Engineering' });
    fireEvent.click(engineeringOption);
    await act(async () => {
      jest.advanceTimersByTime(500);
    });
    expect(fetchEmployeesMock).toHaveBeenCalledWith("", "Engineering", "none");
  });

  it('displays zero state when no employees are found', async () => {
    (ACTIONS.setUsers as jest.Mock).mockImplementation(()=>({ type: 'SET_USERS', payload: { employees: []}}))
    await renderDashboard();

    await act(async () => {
      jest.advanceTimersByTime(500);
    });
    expect(await screen.findByText('There are no employees found')).toBeInTheDocument();
  });

  it('handles search input', async () => {
    await renderDashboard();
    const searchInput = screen.getByPlaceholderText('Search by name or position');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(fetchEmployeesMock).toHaveBeenCalledWith("John", "All", "none");
  });
});
