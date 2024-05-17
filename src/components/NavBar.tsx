import * as React from 'react';
import styled from 'styled-components';
import { ArrowLeft } from 'react-bootstrap-icons';

import { AppContext } from '../contexts/appContext';
import logo from '../assets/logo192.png'

const Header = styled.header<{ $darkMode: boolean }>`
  ${
    props => props.$darkMode &&
    `
      color: var(--dark-grey);
    `
  }
`;
const Nav = styled.nav<{ $darkMode: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 100%;
  height: var(--navbar-height);
  padding: 8px 16px;

  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;

  ${
    props => props.$darkMode &&
    `
      background: var(--dark-1);
    `
  }
`;

const BackLink = styled.a`
  color: var(--dark-grey);

  & :hover {
    color: var(--bs-blue);
  }
`

const NavBar = () => {
  const appContext = React.useContext(AppContext);

  return (
    <Header data-testid='header' $darkMode={true}>
      <Nav $darkMode={true}>
        <div>
          {/* since this is an external route outside of react, we should use regular anchor tag */}
          <BackLink href={appContext?.backBtnUrl} aria-label="Back to Dashboard">
            <ArrowLeft size={32} fontWeight={600} />
          </BackLink>
        </div>
        <div>
          <img src={logo} width={50} alt='Logo' />
        </div>
      </Nav>
    </Header>
  )
}

export { NavBar };