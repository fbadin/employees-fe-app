import { render, screen, fireEvent } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { AppContext } from '../contexts/appContext';
import { URLS } from '../routes';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

const employeesData = {
	employees: [
		{ id: '1', name: 'John Snow', position: 'Software Developer', department: 'Engineering' },
	],
}

beforeEach(()=>{
	global.fetch = jest.fn().mockImplementation((url, options) => {
		return Promise.resolve({
			status: 200,
			ok: true,
			json: async () => employeesData,
		});
	}) as jest.Mock;
})

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

jest.useFakeTimers();

const mockSetBackBtnUrl = jest.fn();
const mockSetEmployees = jest.fn();

const mockAppContextValue = {
  employees: {
    employees: [],
  },
  setEmployees: mockSetEmployees,
	backBtnUrl: '/dashboard',
  setBackBtnUrl: mockSetBackBtnUrl,
};

const renderDashboard = async () => {
  await act(async () => {
		render(
			<AppContext.Provider value={mockAppContextValue}>
				<BrowserRouter>
					<Dashboard />
				</BrowserRouter>
			</AppContext.Provider>
		);
	});
};

describe('Dashboard', () => {
  it('renders the Dashboard component', async () => {
    await renderDashboard();
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
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
    expect(mockSetEmployees).toHaveBeenCalledTimes(2);
		expect(mockSetEmployees).toHaveBeenCalledWith(employeesData);
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
		expect(mockSetEmployees).toHaveBeenCalledTimes(2);
    expect(mockSetEmployees).toHaveBeenCalledWith(employeesData);
  });

  it('displays zero state when no employees are found', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({ employees: [] }),
      }),
    ) as jest.Mock;

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
		expect(mockSetEmployees).toHaveBeenCalledTimes(2);
    expect(mockSetEmployees).toHaveBeenCalledWith(employeesData)
  });
});
