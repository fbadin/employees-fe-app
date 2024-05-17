import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { EmployeesData, fetchEmployees } from '../api/employees';
import { AppContext } from '../contexts/appContext';
import { URLS } from '../routes';

const Dashboard = () => {
  const appContext = React.useContext(AppContext);
  const [employees, setEmployees] = React.useState<EmployeesData | undefined>();
  const navigate = useNavigate();

  React.useEffect(()=>{
    appContext?.setBackBtnUrl(URLS.DASHBOARD);
  }, [appContext]);

  React.useEffect(()=>{
    (async () => {
      const response = await fetchEmployees();

      if (response.error_message) {
        toast.error(response.error_message);
        return;
      }

      setEmployees(response.data);
    })();
  }, []);

  return (
    <div data-testid="main-container">
      <h1 className="text-lg">Employees Dashboard</h1>
      <ListGroup className="mt-3">
        {
          employees?.employees.map((employee) => {
            return (
              <ListGroup.Item
                action
                key={employee.id}
                variant="dark"
                onClick={() => navigate(URLS.EMPLOYEE_DETAILS(employee.id))}
              >
                <div className='flex justify-between'>
                  {employee.name}
                  <div className="text-gray-500">{employee.department}</div>
                </div>
              </ListGroup.Item>
            )
          })
        }
      </ListGroup>
    </div>
  )
}

export { Dashboard };