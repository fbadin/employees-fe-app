import * as React from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';

import { AppContext } from '../contexts/appContext';
import logo from '../assets/logo192.png'
import { useLocation } from 'react-router-dom';
import { URLS } from '../routes';

const NavBar = () => {
  const appContext = React.useContext(AppContext);
  const location = useLocation();

  const showBackLink = location.pathname.includes(URLS.EMPLOYEE_DETAILS(null));

  return (
    <header data-testid='navbar' className="text-dark-gray">
      <nav data-testid='nav' className="absolute top-0 left-0 w-full min-w-full h-16 px-4 py-2 flex gap-4 justify-between items-center bg-dark-1">
        <div>
          {
            showBackLink && (
              <a
                href={appContext?.backBtnUrl}
                aria-label="Back to Dashboard"
                className="hover:text-blue-500"
              >
                <ArrowLeft size={32} fontWeight={600} />
              </a>
            )
          }
        </div>
        <div>
          <img src={logo} width={50} alt='Logo' />
        </div>
      </nav>
    </header>
  )
}

export { NavBar };