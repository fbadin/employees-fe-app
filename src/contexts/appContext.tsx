import * as React from 'react';

type Context = {
	backBtnUrl: string;
	setBackBtnUrl: (url: string) => void;
}

const AppContext = React.createContext<undefined | Context>(undefined);

export { AppContext };