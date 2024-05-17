import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Router from 'react-router-dom';

import { Dashboard } from './Dashboard';
import { URLS } from '../routes';

jest.mock('react-router-dom', ()=>({
	useNavigate: jest.fn()
}));

beforeEach(() => {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			ok: true,
			json: async () => ({ companies: [{ name: 'Company 1', picture_url: null, quota: 10, uuid: '102030' }] }),
		}),
	) as jest.Mock;
});

describe('Dashboard component', () => {
	test('renders the main container', async () => {
		await act(async () => render(<Dashboard />));

		await waitFor(() => {
			const mainComponent = screen.getByTestId('main-container');
			expect(mainComponent).toBeInTheDocument();
		});
	});

  test('renders the main container', async () => {
		const mockedNavigate = jest.fn();
		jest.spyOn(Router, 'useNavigate').mockReturnValue(mockedNavigate);

		await act(async ()=> render(<Dashboard />));

		await waitFor(() => {
			expect(screen.getByTestId('main-container')).toBeInTheDocument();
			const listItem = screen.getByText('Company 1');
			expect(listItem).toBeInTheDocument();

			fireEvent.click(listItem);

			expect(mockedNavigate).toHaveBeenCalledWith(URLS.EMPLOYEE_DETAILS('102030'))
		});
	});
});