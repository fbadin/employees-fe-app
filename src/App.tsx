import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EmployeesData } from './api/employees';

import { AppContext } from './contexts/appContext';
import { Dashboard } from './pages/Dashboard';
import { EmployeeDetails } from './pages/EmployeeDetails';
import { CommonTemplate } from './templates/CommonTemplate';

const App = () => {
  const [backBtnUrl, setBackBtnUrl] = React.useState<string>("");
  const [employees, setEmployees] = React.useState<EmployeesData | undefined>();

  return (
    <AppContext.Provider value={{ backBtnUrl, setBackBtnUrl, employees, setEmployees }}>
      <div data-testid='app-root' className='h-app-root'>
        <BrowserRouter>
          <CommonTemplate>
            <Routes>
              <Route path="/dashboard/" element={<Dashboard />} />
              <Route path="/employees/:id?" element={<EmployeeDetails />} />
              <Route path="/" element={<Dashboard />} />
              {/* Catch-all route for undefined paths */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </CommonTemplate>
        </BrowserRouter>
      </div>
      <ToastContainer />
    </AppContext.Provider>
  );
}

export default App;
