import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { NavBar } from './components/NavBar';
import { AppContext } from './contexts/appContext';
import { Dashboard } from './pages/Dashboard';
import { EmployeeDetails } from './pages/EmployeeDetails';
import { CommonTemplate } from './templates/common_template';

const App = () => {
  const [backBtnUrl, setBackBtnUrl] = React.useState<string>("");

  return (
    <AppContext.Provider value={{ backBtnUrl, setBackBtnUrl }}>
      <div data-testid='app-root' className='h-app-root'>
        <ToastContainer />
        <BrowserRouter>
          <NavBar/>
          <CommonTemplate>
            <Routes>
              <Route path="/dashboard/" element={<Dashboard />} />
              <Route path="/employees/:id?" element={<EmployeeDetails />} />
              {/* TODO return a generic component */}
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </CommonTemplate>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
