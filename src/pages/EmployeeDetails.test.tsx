import { render } from '@testing-library/react';
import Router from 'react-router-dom';

import { EmployeeDetails } from './EmployeeDetails';

jest.mock('react-router-dom', () => ({
	useParams: jest.fn(),
	useNavigate: jest.fn()
}));

describe('CompanyDetails', () => {
 it.only('renders the info about the company', ()=>{
	jest.spyOn(Router, 'useParams').mockReturnValue({ uuid: '102030' })
	jest.spyOn(Router, 'useNavigate').mockReturnValue(jest.fn());

	const { debug }  = render(<EmployeeDetails />);
 });
});