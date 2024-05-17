import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	:root {
		--primary-color: #7b3192;
		--secondary-color: #52e1c5;
		--teal: #1cc1c3;
		--green: #05c175;
		--dark-green: #38bba1;
		--dark-green-alpha: #38bba1e6;
		--black: #000000;
		--white: #ffffff;
		--pink: #ce56c5;
		--light-pink: #aa70c7;
		--navbar-height: 66px;

		// dark styles
		--dark-1: rgb(48, 49, 52);
		--dark-2: #202124;
		--dark-grey: rgb(189, 193, 198);

		color-scheme: light dark;
	}

	body {
		color: light-dark(#333b3c, #efefec);
		background-color: light-dark(#efedea, #223a2c);
	}
`;

export const AppRoot = styled.div`
	height: calc(100vh - var(--navbar-height));

`

export const Main = styled.main<{ $darkMode: boolean }>`
	margin-top: var(--navbar-height);
	min-height: 100%;

	${
		props => props.$darkMode &&
		`
			color: var(--dark-grey);
			background: var(--dark-2);
		`
	}
`;