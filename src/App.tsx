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

const App = () => {
  const [backBtnUrl, setBackBtnUrl] = React.useState<string>("");

  return (
    <AppContext.Provider value={{ backBtnUrl, setBackBtnUrl }}>
      <div data-testid='app-root' className='h-app-root'>
        <ToastContainer />
        <BrowserRouter>
          <NavBar/>

          <div data-testid="main" className="bg-dark-2 text-dark-gray min-h-full mt-16">
            <div className="p-3 container">
              <Routes>
                <Route path="/dashboard/" element={<Dashboard />} />
                <Route path="/employees/:id?" element={<EmployeeDetails />} />
                {/* TODO return a generic component */}
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
