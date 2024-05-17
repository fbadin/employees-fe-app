import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { NavBar } from './components/NavBar';
import { AppContext } from './contexts/appContext';
import { Dashboard } from './pages/Dashboard';
import { AppRoot, GlobalStyle, Main } from './App.styles';
import { EmployeeDetails } from './pages/EmployeeDetails';

const App = () => {
  const [backBtnUrl, setBackBtnUrl] = React.useState<string>("");

  return (
    <AppContext.Provider value={{ backBtnUrl, setBackBtnUrl }}>
      <AppRoot data-testid='app-root'>
        <GlobalStyle />
        <ToastContainer />
        <BrowserRouter>
          <NavBar/>

          <Main data-testid="main" $darkMode={true}>
            <div className="p-3 container">
              <Routes>
                <Route path="/dashboard/" element={<Dashboard />} />
                <Route path="/employees/:id" element={<EmployeeDetails />} />
                {/* TODO return a generic component */}
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </div>
          </Main>
        </BrowserRouter>
      </AppRoot>
    </AppContext.Provider>
  );
}

export default App;
