import React from 'react';

const useDebounce = (value: string, timeout: number = 500) => {
	const [debouncedValue, setDebouncedValue] = React.useState(value);

	React.useEffect(()=>{
		const timerId = setTimeout(()=>{
			setDebouncedValue(value);
		}, timeout);

		return () => {
			clearTimeout(timerId);
		}

	}, [value, timeout]);

	return {
		debouncedValue
	}
};

export default useDebounce;