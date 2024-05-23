import React from 'react';
import Router from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../contexts/appContext';
import { EmployeeDetails } from './EmployeeDetails';
import {
  fetchEmployeeDetails,
  deleteEmployee,
  createEmployee,
  updateEmployee
} from '../api/employees';
import { act } from 'react-dom/test-utils';

jest.mock('../api/employees');

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockEmployeeDetails = {
  id: '664d4c336d58f26dd0c65a0a',
  name: 'Bob Joe',
  email: 'bjoe@gmail.com',
  position: 'Analyst',
  department: 'Sales',
  salary: '70000',
  start_date: '2024-04-29T00:00:00.000Z',
  created_at: '2024-05-22T01:36:51.982Z',
  updated_at: '2024-05-22T01:44:17.725Z',
};

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

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn()
}));

const renderComponent = async (id: string | undefined) => {
  const useParamsMock = jest.fn().mockReturnValue({ id: id });

  jest.spyOn(require('react-router-dom'), 'useParams').mockImplementation(useParamsMock);
  jest.spyOn(Router, 'useNavigate').mockReturnValue(jest.fn());

  await act(async () => {
    render(
      <AppContext.Provider value={mockAppContextValue}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<EmployeeDetails />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    );
  });
};

describe('EmployeeDetails', () => {
  it('fetches and displays employee details', async () => {
    const { fetchEmployeeDetails } = require('../api/employees');
    fetchEmployeeDetails.mockResolvedValue({ data: mockEmployeeDetails });

    await renderComponent(mockEmployeeDetails.id);

    await waitFor(() => {
      expect(fetchEmployeeDetails).toHaveBeenCalledWith(mockEmployeeDetails.id)
    });

    expect(screen.getByLabelText("Employee's name")).toHaveValue('Bob Joe');
    expect(screen.getByLabelText('Email')).toHaveValue('bjoe@gmail.com');
    expect(screen.getByLabelText('Position')).toHaveValue('Analyst');
    expect(screen.getByLabelText('Salary')).toHaveValue(70000);
    expect(screen.getByLabelText('Start Date')).toHaveValue('2024-04-29');
  });

  it('validates form inputs', async () => {
    await renderComponent(undefined);

    fireEvent.change(screen.getByLabelText("Employee's name"), { target: { value: 'Bob' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText('Position'), { target: { value: 'Dev' } });
    fireEvent.change(screen.getByLabelText('Salary'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Start Date'), { target: { value: '' } });

    fireEvent.click(screen.getByText('Save Employee'));

    expect(screen.getByText("Please type the employee's full name.")).toBeInTheDocument();
    expect(screen.getByText('Please choose a valid Email')).toBeInTheDocument();
    expect(screen.getByText('Please choose a position')).toBeInTheDocument();
    expect(screen.getByText('Please choose a salary per year. 5 Digits minimum.')).toBeInTheDocument();
    expect(screen.getByText('Please choose a start date')).toBeInTheDocument();
  });

  it('creates a new employee', async () => {
    const { createEmployee } = require('../api/employees');
    createEmployee.mockResolvedValue({ data: { id: 'new-id' } });

    await renderComponent(undefined);

    fireEvent.change(screen.getByLabelText("Employee's name"), { target: { value: 'Alice Wonderland' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'alice@wonderland.com' } });
    fireEvent.change(screen.getByLabelText('Position'), { target: { value: 'Developer' } });
    fireEvent.change(screen.getByLabelText('Salary'), { target: { value: '70000' } });
    fireEvent.change(screen.getByLabelText('Start Date'), { target: { value: '2024-06-01' } });

    fireEvent.click(screen.getByText('Save Employee'));

    await waitFor(() => expect(createEmployee).toHaveBeenCalled());

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Employee Alice Wonderland created with success!');
    });
  });

  it('updates an existing employee', async () => {
    const { fetchEmployeeDetails, updateEmployee } = require('../api/employees');
    fetchEmployeeDetails.mockResolvedValue({ data: mockEmployeeDetails });
    updateEmployee.mockResolvedValue({});

    await renderComponent(mockEmployeeDetails.id);

    await waitFor(() => expect(fetchEmployeeDetails).toHaveBeenCalled());

    fireEvent.change(screen.getByLabelText("Employee's name"), { target: { value: 'Bob Joe Updated' } });
    fireEvent.click(screen.getByText('Update Employee'));

    await waitFor(() => expect(updateEmployee).toHaveBeenCalled());

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Employee Bob Joe Updated updated with success!');
    })
  });

  it('deletes an employee', async () => {

    const { fetchEmployeeDetails, deleteEmployee } = require('../api/employees');
    fetchEmployeeDetails.mockResolvedValue({ data: mockEmployeeDetails });
    deleteEmployee.mockResolvedValue({});

    await renderComponent(mockEmployeeDetails.id);

    await waitFor(() => expect(fetchEmployeeDetails).toHaveBeenCalled());

    fireEvent.click(screen.getByText('Delete Employee'));
    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => expect(deleteEmployee).toHaveBeenCalled());

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Bob Joe was deleted');
    })
  });
});
